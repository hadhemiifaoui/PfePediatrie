const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: {type: String, required: true},
  dob: {type: String, required: true},
  gender: {type: String, enum : ['male' , 'female'], required: true},
  bloodType:{type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']},
  weight:{type: Number},
  height:{type: Number},
  parent:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }, 
  pediatre:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  image: {type: String},
  
  allergies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Allergies'}],
  healthconditions : [{type: mongoose.Schema.Types.ObjectId, ref: 'healthconditions'}],
  hospitalisations:[{type: mongoose.Schema.Types.ObjectId, ref: 'hospitalisation'}],
  medications:[{type: mongoose.Schema.Types.ObjectId, ref: 'medications'}],
  vaccinations:[{type: mongoose.Schema.Types.ObjectId, ref: 'vaccin'}]

});
const Child = mongoose.model('childs', childSchema);
module.exports = Child;

