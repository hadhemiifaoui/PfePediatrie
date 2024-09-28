const mongoose = require('mongoose');

const PediatricCaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique : true
  },
  description: {
    type: String,
    required: true
  },
  secteur: {
    type: String,
    enum: [
        'Neonatologie', 'Pneumologie pédiatrique', 'Cardiologie pédiatrique',
        'Oto-rhino-laryngologie pédiatrique', 'Neurologie pédiatrique',
        'Pathologies infectieuses pédiatriques', 'Hépato-gastro-entérologie',
        'Endocrinologie', 'Nephrologie', 'Dermatologie pédiatrique', 'Hématologie pédiatrique', 'Chirurgie pédiatrique',
        'Urgences chirurgicales', 'Intoxication chez l’enfant', 'Réanimation pédiatrique'
    ],
    ref : 'Secteur'
}

});

const PediatricCase = mongoose.model('PediatricCase', PediatricCaseSchema);
module.exports = PediatricCase