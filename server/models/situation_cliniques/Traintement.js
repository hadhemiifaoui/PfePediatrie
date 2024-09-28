const mongoose = require('mongoose');

const TraitementSchema = new mongoose.Schema({
    hospitalisation: { type: Boolean, default: false }, 
    maintienTemperature: { type: String },  
    monitorageCardioRespiratoire: { type: Boolean, default: false },  
    medications: [{
        medicament: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicament', required: true }, 
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true }
    }],
    followUpInstructions: { type: String }, 
    dietaryRestrictions: { type: String },  
    psychologicalSupport: { type: Boolean, default: false }, 
    additionalNotes: { type: String },  
    diagnostic: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagnostic' }, 
    caseName: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' }  
});

const Traitement = mongoose.model('Traitement', TraitementSchema);
module.exports = Traitement;
