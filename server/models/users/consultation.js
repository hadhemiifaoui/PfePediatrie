const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  pediatre: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'childs', required: true },
  dateTime: { type: Date, required: true },
  roomId: { type: String, unique: true },
  meetLink: { type: String },
});

const Consultation = mongoose.model('Consultation', consultationSchema);
module.exports = Consultation;