const mongoose = require('mongoose');
const Test = require('./test');

const TestRadiologiquesSchema = new mongoose.Schema({
  
  radiographiePulmonaire: {
    type: String,
    enum: ['Normale', 'Anormale', 'Non Exécuté']
  },
  asp: {
    type: String,
    enum: ['Normale', 'Anormale', 'Non Exécuté']
  }
});

const TestRadiologiques = Test.discriminator('Test Radiologiques', TestRadiologiquesSchema);

module.exports = TestRadiologiques;
