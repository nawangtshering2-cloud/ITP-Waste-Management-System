const mongoose = require('mongoose');

const { Schema } = mongoose;

const awarenessContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Awareness',
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwarenessContent = mongoose.model('EWasteAwarenessContent', awarenessContentSchema);

module.exports = AwarenessContent;