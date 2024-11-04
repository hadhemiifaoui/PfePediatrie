const mongoose = require('mongoose');
const CaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique : true
  },
  dateOpened: { type: String  },
  status: { type: String, required: true , enum: [
    'Ouverte', 
    'Fermé'
  ]},
    severity: {
      type: String,
      enum: ['Faible', 'Moyenne', 'Fort'],
  },
  notes: { type: String, required: true },
  description: { type: String, required: true },
  pediatricType: { 
    type: String,
    required : true ,
    enum: [
      'Neonatologie', 
      'Pneumologie pédiatrique', 
      'Cardiologie pédiatrique', 
      'Oto-rhino-laryngologie pédiatrique', 
      'Neurologie pédiatrique', 
      'Pathologies infectieuses pédiatriques', 
      'Hépato-gastro-entérologie', 
      'Endocrinologie', 
      'Nephrologie', 
      'Dermatologie pédiatrique', 
      'Hématologie pédiatrique', 
      'Chirurgie pédiatrique',
      'Urgences chirurgicales', 
      'Intoxication chez l’enfant', 
      'Réanimation pédiatrique'
    ]
  },
  symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }],
  diagnostics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diagnostic' }],
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
  treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Traitement' }]
});

const Case = mongoose.model('Case', CaseSchema);
module.exports = Case
