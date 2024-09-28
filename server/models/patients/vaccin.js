const mongoose = require('mongoose');

const VaccinSchema = new mongoose.Schema({
  vaccinatedFor: { type: String, required: true },
  CaughtOn : { type: String },
  vaccinName: { type: String },
  Details: { type: String },
  notes: { type: String },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  ,
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'childs' }
});


const Vaccin = mongoose.model('vaccin', VaccinSchema);
module.exports = Vaccin

