const router = require('express').Router();
const passport = require('passport');
require('../../passport');

const Recycler = require('../../Models/EWaste/Recycler');
const Notification = require('../../Models/EWaste/Notification');

const normalizeCategories = (value) =>
  Array.isArray(value)
    ? value.filter(Boolean)
    : String(value || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const createNotification = async ({ userId, title, message, type }) => {
  if (!userId) {
    return;
  }

  await Notification.create({ userId, title, message, type });
};

router.get('/public', async (_req, res) => {
  try {
    const recyclers = await Recycler.find({
      verificationStatus: 'VERIFIED',
      status: 'ACTIVE',
    }).sort({ createdAt: -1 });

    res.json({ success: true, recyclers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/locator', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const recyclers = await Recycler.find({ verificationStatus: 'VERIFIED', status: 'ACTIVE' });

    const mapWithDistance = recyclers
      .map((recycler) => {
        let distance = null;

        if (latitude && longitude) {
          const earthRadiusKm = 6371;
          const latDistance = ((Number(recycler.latitude) - Number(latitude)) * Math.PI) / 180;
          const lngDistance = ((Number(recycler.longitude) - Number(longitude)) * Math.PI) / 180;
          const a =
            Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
            Math.cos((Number(latitude) * Math.PI) / 180) *
              Math.cos((Number(recycler.latitude) * Math.PI) / 180) *
              Math.sin(lngDistance / 2) *
              Math.sin(lngDistance / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          distance = Number((earthRadiusKm * c).toFixed(2));
        }

        return {
          ...recycler.toObject(),
          distance,
        };
      })
      .sort((left, right) => {
        if (left.distance === null) return 1;
        if (right.distance === null) return -1;
        return left.distance - right.distance;
      });

    res.json({ success: true, recyclers: mapWithDistance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    const filter = currentRole === 'admin' ? {} : { verificationStatus: 'VERIFIED', status: 'ACTIVE' };
    const recyclers = await Recycler.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, recyclers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const recycler = await Recycler.create({
      recyclerName: req.body.recyclerName,
      organization: req.body.organization,
      contact: req.body.contact,
      email: req.body.email,
      address: req.body.address,
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
      acceptedCategories: normalizeCategories(req.body.acceptedCategories),
      operatingHours: req.body.operatingHours,
      verificationStatus: req.body.verificationStatus || 'PENDING',
      status: req.body.status || 'ACTIVE',
    });

    res.status(201).json({ success: true, recycler });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const recycler = await Recycler.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          recyclerName: req.body.recyclerName,
          organization: req.body.organization,
          contact: req.body.contact,
          email: req.body.email,
          address: req.body.address,
          latitude: Number(req.body.latitude),
          longitude: Number(req.body.longitude),
          acceptedCategories: normalizeCategories(req.body.acceptedCategories),
          operatingHours: req.body.operatingHours,
          verificationStatus: req.body.verificationStatus,
          status: req.body.status,
        },
      },
      { new: true, runValidators: true }
    );

    if (!recycler) {
      return res.status(404).json({ success: false, message: 'Recycler not found.' });
    }

    res.json({ success: true, recycler });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.patch('/:id/verification', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const { verificationStatus, status } = req.body;
    const recycler = await Recycler.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          verificationStatus,
          status,
        },
      },
      { new: true, runValidators: true }
    );

    if (!recycler) {
      return res.status(404).json({ success: false, message: 'Recycler not found.' });
    }

    await createNotification({
      userId: req.user._id,
      title: 'Recycler verification updated',
      message: `${recycler.recyclerName} was updated to ${verificationStatus}.`,
      type: 'RECYCLER_VERIFICATION',
    });

    res.json({ success: true, recycler });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const recycler = await Recycler.findByIdAndDelete(req.params.id);
    if (!recycler) {
      return res.status(404).json({ success: false, message: 'Recycler not found.' });
    }

    res.json({ success: true, recycler });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/stats/overview', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const [total, verified, pending, active] = await Promise.all([
      Recycler.countDocuments(),
      Recycler.countDocuments({ verificationStatus: 'VERIFIED' }),
      Recycler.countDocuments({ verificationStatus: 'PENDING' }),
      Recycler.countDocuments({ status: 'ACTIVE' }),
    ]);

    res.json({ success: true, stats: { total, verified, pending, active } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;