const Hospitalisation = require('../../models/patients/hospitalisation')

const createHospitalisation = async (req, res) => {
  try {
    const hosp = new Hospitalisation(req.body);
    await hosp.save();
    res.status(201).json(hosp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllHospitalisations = async (req, res) => {
  try {
    const hosps = await Hospitalisation.find();
    res.status(200).json(hosps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getHosptalisationById = async (req, res) =>{
  try {
     const {id} = req.params
     const hosp = await Hospitalisation.findById(id)
     if(!hosp){
      res.status(404).json({message : 'Hospitalisation not found'})
     }
     res.status(201).json(hosp)
  }
  catch(error){
    console.error(error)
    res.status(500).json({message : 'Internal Error Server'})
  }
}


const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHospitalisationData = req.body;

    const updatedHospt = await Hospitalisation.findByIdAndUpdate(id, updatedHospitalisationData, { new: true });

    if (!updatedHospt) {
      return res.status(404).json({ message: 'Hospitalisation not found' });
    }

    res.json(updatedHospt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const hosp = await Hospitalisation.findByIdAndDelete(id);

    if (!hosp) {
      return res.status(404).json({ message: ' Hospitalisation not found' });
    }

    res.json({ message: 'Hospitalisation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHopsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params; 
    const hosp = await Hospitalisation.find({ patient: patientId });
    if (!hosp || hosp.length === 0) {
      return res.status(404).json({ message: 'No Hospitalisation found for this patient' });
    }
    res.status(200).json(hosp);
  } catch (error) {
    console.error('Error fetching hospitalisation for patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getHospitByChildId = async (req, res) => {
  try {
    const { childId } = req.params; 
    const hospts = await Hospitalisation.find({ child: childId });

    if (!hospts || hospts.length === 0) {
      return res.status(404).json({ message: 'No hospitalisation found for this user ' });
    }

    res.status(200).json(hospts);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {createHospitalisation ,getAllHospitalisations,
  getHopsByPatientId , getHospitByChildId, getHosptalisationById  ,
  update , remove  }