const mongoose = require('mongoose');

const secteurSchema = new mongoose.Schema({
    nom: {
        type: String,
        enum: [
            'Neonatologie', 'Pneumologie pédiatrique', 'Cardiologie pédiatrique', 
            'Oto-rhino-laryngologie pédiatrique', 'Neurologie pédiatrique', 
            'Pathologies infectieuses pédiatriques', 'Hépato-gastro-entérologie', 
            'Endocrinologie', 'Nephrologie', 'Dermatologie pédiatrique', 'Hématologie pédiatrique', 'Chirurgie pédiatrique',
            'Urgences chirurgicales', 'Intoxication chez l’enfant', 'Réanimation pédiatrique'
        ],
        required: true,
        unique : true

    },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PediatricCase' }]
});

const Secteur = mongoose.model('secteurs', secteurSchema);

module.exports = Secteur;
