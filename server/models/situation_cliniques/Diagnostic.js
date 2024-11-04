const mongoose = require('mongoose');

const DiagnosticSchema = new mongoose.Schema({
    factorsRisks: { type: String },
    caseName: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' , required : true},
    name: { type: String},
    description: { type: String },
    dateDiagnosed: { type: Date, default: Date.now },
    treatmentPlan: { type: String },
    confirmed: { type: Boolean, default: false },
    severity: {
        type: String,
        enum: ['Faible', 'Moyenne', 'Fort'],
    },
    confirmedDiagnostic: { type: mongoose.Schema.Types.ObjectId, ref: 'ConfirmedDiagnostic' },
    treatement : {type: mongoose.Schema.Types.ObjectId, ref:'Traitement'}
}, { timestamps: true });

const Diagnostic = mongoose.model('Diagnostic', DiagnosticSchema);
module.exports = Diagnostic;




