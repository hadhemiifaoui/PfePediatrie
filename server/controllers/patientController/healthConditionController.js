const HealthCondition = require('../../models/patients/healthcondition');
const Medicament = require('../../models/situation_cliniques/Medicament')
const createHealthCondition = async (req, res) => {
  try {
    const healthCondition = new HealthCondition(req.body);
    await healthCondition.save();
    res.status(201).json(healthCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getHealthConditions = async (req, res) => {
  try {
    const healthConditions = await HealthCondition.find().populate('medications' , 'nom');
    res.status(200).json(healthConditions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getHealthConditionById = async (req, res) =>{
  try {
     const {id} = req.params
     const healthcondition = await HealthCondition.findById(id).populate('medications' , 'nom');
     if(!healthcondition){
      res.status(404).json({message : 'health condition not found'})
     }
     res.status(201).json(healthcondition)
  }
  catch(error){
    console.error(error)
    res.status(500).json({message : 'Internal Error Server'})
  }
}


const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHealthConditionData = req.body;

    const updatedHealthCondition = await HealthCondition.findByIdAndUpdate(id, updatedHealthConditionData, { new: true });

    if (!updatedHealthCondition) {
      return res.status(404).json({ message: 'Health Condition not found' });
    }

    res.json(updatedHealthCondition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHealthCondtion = await HealthCondition.findByIdAndDelete(id);

    if (!deletedHealthCondtion) {
      return res.status(404).json({ message: 'Health Condition  not found' });
    }

    res.json({ message: 'Health condition deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedication = async (req , res) => {
  const { id } = req.params; 

  try {
    const healthCondition = await HealthCondition.findById(id).populate('medications', 'nom');

    if (!healthCondition) {
      return res.status(404).json({ message: 'Health condition not found' });
    }

    const medications = healthCondition.medications;

    if (!medications || medications.length === 0) {
      return res.status(404).json({ message: 'No medications found for this health condition' });
    }

    res.status(200).json(medications);  
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getHealthConditionByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params; 
    const healthConditions = await HealthCondition.find({ patient: patientId }).populate('medications', 'medicationName');

    if (!healthConditions || healthConditions.length === 0) {
      return res.status(404).json({ message: 'No health conditions found for this patient' });
    }

    res.status(200).json(healthConditions);
  } catch (error) {
    console.error('Error fetching health conditions for patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


  //hedhi li mish ne5dem biha!!

  
const getHealthConditionsByChildId = async (req, res) => {
  try {
    const { childId } = req.params; 
    const healths = await HealthCondition.find({ child: childId }).populate('medications');

    if (!healths || healths.length === 0) {
      return res.status(404).json({ message: 'No Health Conditionss availabls ' });
    }

    res.status(200).json(healths);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {createHealthCondition , getHealthConditionByPatientId , 
  getHealthConditions , getHealthConditionById,
  getHealthConditionsByChildId
  ,getMedication , 
   update , remove}