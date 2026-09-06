const express = require('express');
const router = express.Router();
const PickupRequest = require('../models/PickupRequest');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// POST /api/pickup/request - Create pickup request (auth required)
router.post('/request', verifyToken, async (req, res) => {
  try {
    const { itemDescription, quantity, pickupDate, pickupTime } = req.body;

    if (!itemDescription || !quantity || !pickupDate || !pickupTime) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newRequest = new PickupRequest({
      userId: req.user.id,
      itemDescription,
      quantity,
      pickupDate,
      pickupTime,
      status: 'pending',
    });

    await newRequest.save();

    res.status(201).json({
      message: 'Pickup request created successfully!',
      request: newRequest,
    });
  } catch (error) {
    console.error('Create pickup request error:', error);
    res.status(500).json({ message: 'Server error creating pickup request.' });
  }
});

// GET /api/pickup/myrequests - Get logged-in user's requests (auth required)
router.get('/myrequests', verifyToken, async (req, res) => {
  try {
    const requests = await PickupRequest.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Get user pickup requests error:', error);
    res.status(500).json({ message: 'Server error retrieving requests.' });
  }
});

// GET /api/pickup/all - Get all requests (admin only)
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const requests = await PickupRequest.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Get all pickup requests error:', error);
    res.status(500).json({ message: 'Server error retrieving all requests.' });
  }
});

// PUT /api/pickup/:id - Update status (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'scheduled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updatedRequest = await PickupRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Pickup request not found.' });
    }

    res.json({
      message: 'Pickup request status updated successfully!',
      request: updatedRequest,
    });
  } catch (error) {
    console.error('Update pickup status error:', error);
    res.status(500).json({ message: 'Server error updating status.' });
  }
});

module.exports = router;
