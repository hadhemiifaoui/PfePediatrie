const mongoose = require('mongoose');
const Test = require('./test');

const TestBiologiquesSchema = new mongoose.Schema({
  hemogramme: {
    type: String,
    enum: ['Normale', 'Anormale', 'Non Exécuté']
  },
  procalcitonine: {
    type: String,
    enum: ['Faible', 'Moyenne', 'Fort', 'Non Exécuté']
  },
  crp: {
    type: String,
    enum: ['Normale', 'Élevé', 'Non Exécuté']
  }
});

const TestBiologiques = Test.discriminator('Test Biologiques', TestBiologiquesSchema);

module.exports = TestBiologiques;
