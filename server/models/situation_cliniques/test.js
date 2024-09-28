const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
  type: { type: String, required: true }
}, { discriminatorKey: 'type'}  ,  { timestamps: true }); 

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;