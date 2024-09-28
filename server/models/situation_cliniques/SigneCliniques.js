const mongoose = require('mongoose');

const SignesCliniquesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sector: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Secteur', 
        required: true 
    },
    pediatricCase: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'PediatricCase', 
        required: true 
    },
    fievre: { 
        type: Boolean,  
        required: false
    },
    hypothermie: { 
        type: Boolean,  
        required: false
    },
    signesHemodynamiques: {
        type: [String], 
        required: false
    },
    signesRespiratoires: {
        type: [String], 
        required: false
    },
    signesNeurologiques: {
        type: [String], 
        required: false
    },
    signesCutanes: {
        type: [String], 
        required: false
    },
    signesDigestifs: {
        type: [String], 
        required: false
    },
    gravité: {
        type: String, 
        enum: ['faible', 'moyenne', 'forte'],
        required: true
    }
}, { timestamps: true });

const SignesCliniques = mongoose.model('SignesCliniques', SignesCliniquesSchema);
module.exports = SignesCliniques;
