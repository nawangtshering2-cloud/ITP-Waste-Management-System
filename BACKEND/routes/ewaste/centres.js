const router = require('express').Router();

const CollectionCentre = require('../../Models/EWaste/CollectionCentre');

const fallbackCentres = [
  {
    name: 'Central E-Waste Collection Hub',
    address: 'Main City Recycling Park',
    contact: '+94 11 000 0000',
    latitude: 6.9271,
    longitude: 79.8612,
    acceptedCategories: ['Mobile Phones', 'Laptops', 'Batteries', 'Printers'],
    operatingHours: 'Mon-Sat 9:00 AM - 5:00 PM',
    active: true,
  },
  {
    name: 'Northside Electronics Recycling Centre',
    address: 'Industrial Road, North District',
    contact: '+94 11 111 1111',
    latitude: 6.9497,
    longitude: 79.8429,
    acceptedCategories: ['Computers', 'Monitors', 'Televisions', 'Chargers'],
    operatingHours: 'Mon-Fri 8:30 AM - 4:30 PM',
    active: true,
  },
];

router.get('/', async (_req, res) => {
  try {
    const centres = await CollectionCentre.find({ active: true }).sort({ createdAt: -1 });
    if (!centres.length) {
      return res.json({ success: true, centres: fallbackCentres });
    }

    res.json({ success: true, centres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, centres: fallbackCentres });
  }
});

module.exports = router;