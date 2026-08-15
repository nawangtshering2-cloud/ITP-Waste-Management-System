const router = require('express').Router();
const passport = require('passport');
require('../../passport');

const PickupRequest = require('../../Models/EWaste/PickupRequest');
const Notification = require('../../Models/EWaste/Notification');
const Recycler = require('../../Models/EWaste/Recycler');

const PICKUP_STATUSES = ['PENDING', 'APPROVED', 'RECYCLER_ASSIGNED', 'PICKUP_SCHEDULED', 'COLLECTED', 'RECYCLED'];

const createNotification = async ({ userId, title, message, type, relatedPickupId }) => {
  await Notification.create({ userId, title, message, type, relatedPickupId });
};

router.get('/summary', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const isAdminOrRecycler = req.user && ['admin', 'recycler'].includes(String(req.user.role || '').toLowerCase());
    const baseFilter = isAdminOrRecycler ? {} : { userId: req.user._id };
    const [total, pending, approved, completed, assigned] = await Promise.all([
      PickupRequest.countDocuments(baseFilter),
      PickupRequest.countDocuments({ ...baseFilter, status: 'PENDING' }),
      PickupRequest.countDocuments({ ...baseFilter, status: 'APPROVED' }),
      PickupRequest.countDocuments({ ...baseFilter, status: { $in: ['COLLECTED', 'RECYCLED'] } }),
      PickupRequest.countDocuments({ ...baseFilter, status: { $in: ['RECYCLER_ASSIGNED', 'PICKUP_SCHEDULED'] } }),
    ]);

    const totalCollected = await PickupRequest.aggregate([
      { $match: { ...baseFilter, collectedWeight: { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: '$collectedWeight' } } },
    ]);

    res.json({
      success: true,
      summary: {
        total,
        pending,
        approved,
        completed,
        assigned,
        totalCollected: totalCollected[0] ? totalCollected[0].total : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const isAdminOrRecycler = req.user && ['admin', 'recycler'].includes(String(req.user.role || '').toLowerCase());
    const pickups = await PickupRequest.find(isAdminOrRecycler ? {} : { userId: req.user._id })
      .populate('userId', 'name username email phone')
      .populate('recyclerId', 'recyclerName organization address contact verificationStatus status acceptedCategories latitude longitude')
      .sort({ createdAt: -1 });

    res.json({ success: true, pickups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/mine', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const pickups = await PickupRequest.find({ userId: req.user._id })
      .populate('recyclerId', 'recyclerName organization address contact verificationStatus status acceptedCategories latitude longitude')
      .sort({ createdAt: -1 });

    res.json({ success: true, pickups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const payload = {
      userId: req.user._id,
      category: req.body.category,
      itemName: req.body.itemName,
      quantity: Number(req.body.quantity),
      condition: req.body.condition,
      approximateWeight: req.body.approximateWeight ? Number(req.body.approximateWeight) : null,
      pickupAddress: req.body.pickupAddress,
      contactInfo: req.body.contactInfo,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      additionalNotes: req.body.additionalNotes || '',
    };

    const pickup = await PickupRequest.create(payload);
    await createNotification({
      userId: req.user._id,
      title: 'Pickup request submitted',
      message: `Your e-waste pickup request ${pickup.trackingCode} has been submitted and is pending review.`,
      type: 'PICKUP_SUBMITTED',
      relatedPickupId: pickup._id,
    });

    res.status(201).json({ success: true, pickup });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.patch('/:id/status', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (!['admin', 'recycler'].includes(currentRole)) {
      return res.status(403).json({ success: false, message: 'Only admins or recyclers can update pickup status.' });
    }

    const { status, recyclerId, collectedWeight, adminNotes } = req.body;
    if (!PICKUP_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid pickup status.' });
    }

    const pickup = await PickupRequest.findById(req.params.id);
    if (!pickup) {
      return res.status(404).json({ success: false, message: 'Pickup request not found.' });
    }

    pickup.status = status;
    if (recyclerId) {
      pickup.recyclerId = recyclerId;
    }
    if (collectedWeight !== undefined && collectedWeight !== null && collectedWeight !== '') {
      pickup.collectedWeight = Number(collectedWeight);
    }
    if (adminNotes !== undefined) {
      pickup.adminNotes = adminNotes;
    }

    await pickup.save();

    await createNotification({
      userId: pickup.userId,
      title: `Pickup status updated to ${status}`,
      message: `Your pickup request ${pickup.trackingCode} is now ${status.replace(/_/g, ' ').toLowerCase()}.`,
      type: 'PICKUP_STATUS_UPDATED',
      relatedPickupId: pickup._id,
    });

    if (recyclerId) {
      await Recycler.findByIdAndUpdate(recyclerId, { $inc: { assignedPickupCount: 1 } });
    }

    res.json({ success: true, pickup });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/track/:trackingCode', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const pickup = await PickupRequest.findOne({ trackingCode: req.params.trackingCode })
      .populate('recyclerId', 'recyclerName organization address contact verificationStatus status acceptedCategories latitude longitude')
      .populate('userId', 'name username email phone');

    if (!pickup) {
      return res.status(404).json({ success: false, message: 'Pickup request not found.' });
    }

    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin' && String(pickup.userId._id || pickup.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'You can only track your own pickup requests.' });
    }

    res.json({ success: true, pickup });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/stats/admin', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const [statusCounts, recyclerCounts] = await Promise.all([
      PickupRequest.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      PickupRequest.aggregate([
        { $match: { collectedWeight: { $gt: 0 } } },
        { $group: { _id: null, totalCollected: { $sum: '$collectedWeight' } } },
      ]),
    ]);

    res.json({
      success: true,
      statusCounts,
      totalCollected: recyclerCounts[0] ? recyclerCounts[0].totalCollected : 0,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;