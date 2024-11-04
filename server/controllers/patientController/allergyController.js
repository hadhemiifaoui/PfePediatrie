const Allergy = require('../../models/patients/allergies')
const Medication = require('../../models/patients/medication')
const Child = require('../../models/users/childs');

const createAllergy = async (req, res) => {
  try {
    const { child } = req.body; 
    const allergy = new Allergy(req.body);
    await allergy.save();
   
    await Child.findByIdAndUpdate(
      child,
      { $push: { allergies: allergy._id } }, 
      { new: true }
    );



    res.status(201).json(allergy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllergies = async (req, res) => {
  try {
    const allergies = await Allergy.find().populate('medications');
    res.status(200).json(allergies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getAllergyById = async (req, res) =>{
  try {
     const {id} = req.params
     const allergy = await Allergy.findById(id)
     if(!allergy){
      res.status(404).json({message : 'Allergy not found'})
     }
     res.status(201).json(allergy)
  }
  catch(error){
    console.error(error)
    res.status(500).json({message : 'Internal Error Server'})
  }
}


const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAllergyData = req.body;

    const updatedAllergy = await Allergy.findByIdAndUpdate(id, updatedAllergyData, { new: true });

    if (!updatedAllergy) {
      return res.status(404).json({ message: 'Allergy not found' });
    }

    res.json(updatedAllergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const allergy = await Allergy.findByIdAndDelete(id);

    if (!allergy) {
      return res.status(404).json({ message: 'ALllergy not found' });
    }

    res.json({ message: 'Allergy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedication = async (req , res) => {
  const { id } = req.params; 

  try {
    const allergy = await Allergy.findById(id).populate('medications', 'nom');

    if (!allergy) {
      return res.status(404).json({ message: 'Allergy not found ' });
    }

    const medications = allergy.medications;

    if (!medications || medications.length === 0) {
      return res.status(404).json({ message: 'mo medica found for this allerg' });
    }

    res.status(200).json(medications);  
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


const getAllergiesByChildId = async (req, res) => {
  try {
    const { childId } = req.params; 
    const allergies = await Allergy.find({ child: childId }).populate('medications');

    if (!allergies || allergies.length === 0) {
      return res.status(404).json({ message: 'No allergies found for the specified child.' });
    }

    res.status(200).json(allergies);
  } catch (error) {
    console.error('Error fetching allergies by child ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getAllergyByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params; 
    const allergy = await Allergy.find({ patient: patientId }).populate('medications', 'medicationName');
    if (!allergy || allergy.length === 0) {
      return res.status(404).json({ message: 'No Allergy found for this patient' });
    }
    res.status(200).json(allergy);
  } catch (error) {
    console.error('Error fetching allergy for patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




module.exports = {createAllergy ,getAllergyByPatientId ,  getAllergies ,getAllergyById ,update,remove,getMedication,getAllergiesByChildId}