const mongoose = require('mongoose');

const HealthConditionSchema = new mongoose.Schema({
  desease: { type: String, required: true },
  diagnosticYear : {type : String, enum :['2014','2015','2016','2017',
  '2018','2019','2020','2021',
  '2022','2023','2024'
  ]},
  diagnosticMonth : {type : String, enum :['Jan','Feb','Mar','Apr',
  'May','Jun','Jul','Aug',
  'Sep','Oct','Nov', 'Dec'
  ]},
  diagnosticDay :  {type : Number, enum : [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
  ,20,21,22,23,24,25,26,27,28,29,30,31
  ]},
 
 medications: [{ type: mongoose.Schema.Types.ObjectId, ref:'Medicament' }],
  treatedBy: { type: String },
  status :{type : String , enum : ['current' , 'past']},
  notes: { type: String },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'childs' }
});

const HealthCondition = mongoose.model('healthconditions', HealthConditionSchema);
module.exports = HealthCondition
