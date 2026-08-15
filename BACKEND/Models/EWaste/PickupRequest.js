const mongoose = require('mongoose');

const { Schema } = mongoose;

const pickupRequestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    recyclerId: {
      type: Schema.Types.ObjectId,
      ref: 'EWasteRecycler',
      default: null,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    condition: {
      type: String,
      required: true,
      trim: true,
    },
    approximateWeight: {
      type: Number,
      default: null,
    },
    pickupAddress: {
      type: String,
      required: true,
      trim: true,
    },
    contactInfo: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDate: {
      type: String,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    additionalNotes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'RECYCLER_ASSIGNED', 'PICKUP_SCHEDULED', 'COLLECTED', 'RECYCLED'],
      default: 'PENDING',
    },
    trackingCode: {
      type: String,
      unique: true,
      index: true,
    },
    collectedWeight: {
      type: Number,
      default: null,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

pickupRequestSchema.pre('validate', function generateTrackingCode(next) {
  if (!this.trackingCode) {
    this.trackingCode = `EW-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  }

  next();
});

const PickupRequest = mongoose.model('EWastePickupRequest', pickupRequestSchema);

module.exports = PickupRequest;