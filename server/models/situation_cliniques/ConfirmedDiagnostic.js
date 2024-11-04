const mongoose = require('mongoose');

const ConfirmedDiagnosticSchema = new mongoose.Schema({
    diagnostic: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagnostic', required: true },
    tests: [{
        type: { type: String, enum: ['TestBiologiques', 'TestBactériologiques', 'TestRadiologiques'], required: true },
        test: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'tests.type' }
    }],
    confirmed: { type: Boolean, default: false }
}, { timestamps: true });

const ConfirmedDiagnostic = mongoose.model('ConfirmedDiagnostic', ConfirmedDiagnosticSchema);
module.exports = ConfirmedDiagnostic;
