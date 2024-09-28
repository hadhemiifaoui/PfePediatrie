const Symptom = require('../models/situation_cliniques/symptoms');
const Case = require('../models/situation_cliniques/case');

const record = async (req, res) => {
  try {
    const { fever, hypothermia, hemodynamicSigns, respiratorySigns,
            neurologicalSigns, cutaneousSigns, digestiveSigns, gravity, caseName } = req.body;            
      
        
    const newSymptom = new Symptom({
      fever,
      hypothermia,
      hemodynamicSigns,
      respiratorySigns,
      neurologicalSigns,
      cutaneousSigns,
      digestiveSigns,
      gravity,
      caseName
    });

    const savedSymptom = await newSymptom.save();

    await Case.findByIdAndUpdate(
      caseName, 
      { $push: { symptoms: savedSymptom._id } },
      { new: true }
    );

    res.status(201).json(savedSymptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const view = async (req, res) => {
  try {
    const symptoms = await Symptom.find().populate('caseName');
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const symptom = await Symptom.findById(id).populate('caseName');

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    res.json(symptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSymptomData = req.body;

    const updatedSymptom = await Symptom.findByIdAndUpdate(
      id,
      updatedSymptomData,
      { new: true }
    ).populate('caseName');

    if (!updatedSymptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    res.json(updatedSymptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSymptom = await Symptom.findByIdAndDelete(id);

    if (!deletedSymptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    res.json({ message: 'Symptom deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchCaseBySymptomId = async (req, res) => {
  try {
    const { id } = req.params;
    const symptom = await Symptom.findById(id).populate('caseName');

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    res.json(symptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { record, view, getById, update, remove, searchCaseBySymptomId };
