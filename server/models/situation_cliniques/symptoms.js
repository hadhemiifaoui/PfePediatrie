const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
  fever: { type: Boolean, default: false },
  hypothermia: { type: Boolean, default: false },
  hemodynamicSigns: { type: [String], default: [] },
  respiratorySigns: { type: [String], default: [] },
  neurologicalSigns: { type: [String], default: [] },
  cutaneousSigns: { type: [String], default: [] },
  digestiveSigns: { type: [String], default: [] },
  gravity: { type: String, enum: ['Faible', 'Moyenne', 'Fort'], default: '' },
  caseName: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },

},  { timestamps: true });
const Symptom = mongoose.model('Symptom', SymptomSchema);
module.exports = Symptom;