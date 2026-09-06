const express = require('express');
const router = express.Router();
const CollectionCentre = require('../models/CollectionCentre');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/centres - Get all collection centres
router.get('/', async (req, res) => {
  try {
    const centres = await CollectionCentre.find().sort({ createdAt: -1 });
    res.json(centres);
  } catch (error) {
    console.error('Get centres error:', error);
    res.status(500).json({ message: 'Server error fetching collection centres.' });
  }
});

// POST /api/centres - Add collection centre (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { centreName, address, city, phone } = req.body;

    if (!centreName || !address || !city || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCentre = new CollectionCentre({
      centreName,
      address,
      city,
      phone,
    });

    await newCentre.save();

    res.status(201).json({
      message: 'Collection centre added successfully!',
      centre: newCentre,
    });
  } catch (error) {
    console.error('Add centre error:', error);
    res.status(500).json({ message: 'Server error adding collection centre.' });
  }
});

module.exports = router;
