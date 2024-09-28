const mongoose = require('mongoose');
const Test = require('./test');

const TestBacteriologiquesSchema = new mongoose.Schema({
  hemoculture: {
    type: String,
    enum: ['Positive', 'Negative', 'Inconclusive', 'Non Exécuté']
  },
  pl: {
    type: String,
    enum: ['Localisée', 'Généralisée', 'Non Appliqué']
  },
  ecbu: {
    type: String,
    enum: ['Positive', 'Negative', 'Inconclusive', 'Non Exécuté']
  }
});

const TestBacteriologiques = Test.discriminator('Test Bactériologiques', TestBacteriologiquesSchema);

module.exports = TestBacteriologiques;
