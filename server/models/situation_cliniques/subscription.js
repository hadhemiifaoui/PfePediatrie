// models/Subscription.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
