const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  medicationName: { type: String, required: true },
  formOfMedicine: { type: String, enum : ['Capsule' ,'Tablet' , 'Syrup', 'Injection',
    'Powder' , 'Spray' , 'Cream' , 'Gel' , 'Lotion' , 'Mouth Wash' , 'Liquid'
  ] ,  required: true },
  dosageQuantity: { type: String, required: true },
  unit: { type: String, enum : ['mg' , 'ml' , '%' , 'mg/ml' ,'mcg/ml' ]  },
  dosageFrequency: { type: String, enum : ['once daily' , 'twice daily' , '3 times daily' , 'anytime'],required: true },
  when: { type: String, enum : ['before meals' , 'after meals' , 'with meals' , 'anytime'] },
  notes: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  medicineTakenFor: { type: String, required: true },
  prescribedBy: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true } ,
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'childs' }

});

const Medication = mongoose.model('medications', MedicationSchema);

module.exports = Medication;
