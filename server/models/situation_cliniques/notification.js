const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  message : {type : String} ,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  read: { type: Boolean, default: false },
  image: { type: String }

}, 
{ timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
