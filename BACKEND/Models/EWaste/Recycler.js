const mongoose = require('mongoose');

const { Schema } = mongoose;

const recyclerSchema = new Schema(
  {
    recyclerName: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    acceptedCategories: {
      type: [String],
      default: [],
    },
    operatingHours: {
      type: String,
      default: 'Mon-Sat 9:00 AM - 5:00 PM',
    },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'REJECTED'],
      default: 'PENDING',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    assignedPickupCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Recycler = mongoose.model('EWasteRecycler', recyclerSchema);

module.exports = Recycler;