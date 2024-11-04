const mongoose = require('mongoose');

const AllergySchema = new mongoose.Schema({
  name: { type: String, required: true },
  triggeredBy: { type: String },
  medications: [{ type: mongoose.Schema.Types.ObjectId, ref:'Medicament' }],
  lastUpdated: { type: String },
  reaction: { type: String },
  firstNoted: { type: String },
  notes: { type: String },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'childs' }
});


const Allergy = mongoose.model('Allergies', AllergySchema);
module.exports = Allergy

