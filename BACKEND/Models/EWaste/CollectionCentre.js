const mongoose = require('mongoose');

const { Schema } = mongoose;

const collectionCentreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CollectionCentre = mongoose.model('EWasteCollectionCentre', collectionCentreSchema);

module.exports = CollectionCentre;