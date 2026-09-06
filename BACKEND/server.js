const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const CollectionCentre = require('./models/CollectionCentre');

const authRoutes = require('./routes/auth');
const pickupRoutes = require('./routes/pickup');
const centreRoutes = require('./routes/centres');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seed Database Function
const seedDatabase = async () => {
  try {
    // 1. Seed Admin User if missing
    const adminEmail = 'admin@ecodispose.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Seeded admin user: admin@ecodispose.com / admin123');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    // 2. Seed Sample Collection Centres if collection is empty
    const centreCount = await CollectionCentre.countDocuments();
    if (centreCount === 0) {
      const sampleCentres = [
        {
          centreName: 'EcoDispose Central E-Waste Facility',
          address: '123 Green Technology Park, Sector 62',
          city: 'Noida',
          phone: '+91 9876543210',
        },
        {
          centreName: 'CleanEarth Recycling Depot',
          address: '45 Industrial Hub, Phase 2',
          city: 'Delhi',
          phone: '+91 9812345678',
        },
        {
          centreName: 'Urban E-Waste Collection Hub',
          address: '88 Cyber City Link Road',
          city: 'Gurugram',
          phone: '+91 9711223344',
        },
      ];
      await CollectionCentre.insertMany(sampleCentres);
      console.log('✅ Seeded 3 sample collection centres.');
    } else {
      console.log(`ℹ️ Collection centres already seeded (${centreCount} centres found).`);
    }
  } catch (error) {
    console.error('❌ Database seeding error:', error.message);
  }
};

// Database Connection
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://anantsinhal26_db_user:6yCIsvg8ELmuvJtkN@cluster0.lgammgl.mongodb.net/?appName=Cluster0';

mongoose
  .connect(MONGODB_URL)
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully.');
    await seedDatabase();
  })
  .catch((err) => {
    console.error('⚠️ MongoDB Connection Error:', err.message);
    console.log('ℹ️ Note: If Atlas credentials have expired, please update MONGODB_URL in BACKEND/.env');
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pickup', pickupRoutes);
app.use('/api/centres', centreRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('EcoDispose API is running on port 5000');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 EcoDispose Backend Server running on port ${PORT}`);
});
