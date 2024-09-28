const Vaccin = require('../../models/patients/vaccin')

const createVaccination = async (req, res) => {
  try {
    const vaccin = new Vaccin(req.body);
    await vaccin.save();
    res.status(201).json(vaccin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllVaccinations = async (req, res) => {
  try {
    const vaccins = await Vaccin.find();
    res.status(200).json(vaccins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getVaccinationById = async (req, res) =>{
  try {
     const {id} = req.params
     const vaccin = await Vaccin.findById(id)
     if(!vaccin){
      res.status(404).json({message : 'Vaccin not found'})
     }
     res.status(201).json(vaccin)
  }
  catch(error){
    console.error(error)
    res.status(500).json({message : 'Internal Error Server'})
  }
}


const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVaccinData = req.body;

    const updatedVaccin= await Vaccin.findByIdAndUpdate(id, updatedVaccinData, { new: true });

    if (!updatedVaccin) {
      return res.status(404).json({ message: 'Vaccin not found' });
    }

    res.json(updatedVaccin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const vaccin = await Vaccin.findByIdAndDelete(id);

    if (!vaccin) {
      return res.status(404).json({ message: 'Vaccin not found' });
    }

    res.json({ message: 'Vaccin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVaccinByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params; 
    const vaccin = await Vaccin.find({ patient: patientId });
    if (!vaccin || vaccin.length === 0) {
      return res.status(404).json({ message: 'No Vaccination found for this patient' });
    }
    res.status(200).json(vaccin);
  } catch (error) {
    console.error('Error fetching vaccination for patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getVaccByChildId = async (req, res) => {
  try {
    const { childId } = req.params; 
    const vaccs = await Vaccin.find({ child: childId });

    if (!vaccs || vaccs.length === 0) {
      return res.status(404).json({ message: 'No vaccins found for this user ' });
    }

    res.status(200).json(vaccs);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {createVaccination ,getAllVaccinations, getVaccinationById  , getVaccByChildId , getVaccinByPatientId , 
  update , remove  }