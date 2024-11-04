
const Medication = require('../../models/patients/medication');

const createMedication = async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

 
const getById = async (req, res) => {
  try {
    const  {id}  = req.params;
    const medication = await Medication.findById(id);

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.json(medication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMedicationData = req.body;

    const updatedMedication = await Medication.findByIdAndUpdate(id, updatedMedicationData, { new: true });

    if (!updatedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.json(updatedMedication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMedication = await Medication.findByIdAndDelete(id);

    if (!deletedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMedicationyPatientId = async (req, res) => {
  try {
    const { patientId } = req.params; 
    const med = await Medication.find({ patient: patientId });
    if (!med || med.length === 0) {
      return res.status(404).json({ message: 'No Medication found for this patient' });
    }
    res.status(200).json(med);
  } catch (error) {
    console.error('Error fetching medication for patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//-->

const getMedicationByChildId = async (req, res) => {
  try {
    const { childId } = req.params; 
    const meds = await Medication.find({ child: childId });

    if (!meds || meds.length === 0) {
      return res.status(404).json({ message: 'No meds found for child ' });
    }

    res.status(200).json(meds);
  } catch (error) {
    console.error('erreur', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = {createMedication , getMedicationyPatientId , getMedicationByChildId , getMedications , getById ,update , remove  }