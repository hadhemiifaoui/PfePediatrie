const mongoose = require('mongoose');

const SigneGraviteSchema = new mongoose.Schema({
    typePediatrie: {
        type: String,
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
        ],
        required: true
    },
    signes: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

const SigneGravite = mongoose.model('SigneGravite', SigneGraviteSchema);
module.exports = SigneGravite;
