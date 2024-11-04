const mongoose = require('mongoose');

const HospitalisationSchema = new mongoose.Schema({
  entryDate: { type: String, required: true },
  releaseDate : { type: String },
  DoctorName: { type: String },
  HospitalName: { type: String },
  Reasons: { type: String },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'childs' }
});


const Hospitalisation = mongoose.model('hospitalisation', HospitalisationSchema);
module.exports = Hospitalisation

