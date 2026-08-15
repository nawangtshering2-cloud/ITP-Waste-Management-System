const router = require('express').Router();
const passport = require('passport');
require('../../passport');

const Notification = require('../../Models/EWaste/Notification');

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const currentRole = String(req.user.role || '').toLowerCase();
    if (currentRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const notifications = await Notification.find().populate('userId', 'name username email role').sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/:id/read', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found.' });
    }

    if (String(notification.userId) !== String(req.user._id) && String(req.user.role || '').toLowerCase() !== 'admin') {
      return res.status(403).json({ success: false, message: 'You cannot update this notification.' });
    }

    notification.read = true;
    await notification.save();

    res.json({ success: true, notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;