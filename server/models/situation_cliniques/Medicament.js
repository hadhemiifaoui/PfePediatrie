const mongoose = require('mongoose');

const MedicamentSchema = new mongoose.Schema({
    nom: { type: String, required: true }
});

const Medicament = mongoose.model('Medicament', MedicamentSchema);
module.exports = Medicament;