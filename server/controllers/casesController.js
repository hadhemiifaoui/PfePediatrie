const Case = require('../models/situation_cliniques/case');
const Diagnostic = require('../models/situation_cliniques/Diagnostic');
const Traitement = require('../models/situation_cliniques/Traintement');
const Symptom = require('../models/situation_cliniques/symptoms');
const TestBiologiques = require('../models/situation_cliniques/TestBiologiques');
const TestBacteriologiques = require('../models/situation_cliniques/TestBacteriologique');
const TestRadiologiques = require('../models/situation_cliniques/TestRadiologiques');
const mongoose = require('mongoose')

const addCase = async (req, res) => {
  try {
    const { title, dateOpened, status, notes, severity, description, pediatricType } = req.body;

    if (!title || !dateOpened || !status || !pediatricType) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const newCase = new Case({
      title,
      dateOpened,
      status,
      notes,
      severity,
      description,
      pediatricType
    }); 
  const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    console.error('Error adding case:', error);
    res.status(400).json({ error: error.message });
  }
};

const viewCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    console.error('Error viewing cases:', error);
    res.status(400).json({ error: error.message });
  }
};

const getCase = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received ID:', id);
    const caseItem = await Case.findById(id).populate('diagnostics treatments symptoms');
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(caseItem);
  } catch (error) {
    console.error('Error getting case:', error);
    res.status(400).json({ error: error.message });
  }
};

const updateCase = async (req, res) => {
  try {
    const caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(caseItem);
  } catch (error) {
    console.error('Error updating case:', error);
    res.status(400).json({ error: error.message });
  }
};

const deleteCase = async (req, res) => {
  try {
    const caseItem = await Case.findByIdAndDelete(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    console.error('Error deleting case:', error);
    res.status(400).json({ error: error.message });
  }
};


const addDiagnostic = async (req, res) => {
  const { caseId } = req.params;
  const { factorsRisks, name, description, severity, dateDiagnosed, treatmentPlan } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return res.status(400).json({ error: 'Invalid caseId' });
    }
    if (!factorsRisks || typeof factorsRisks !== 'string' || factorsRisks.trim() === '') {
      return res.status(400).json({ error: 'Factors Risks must be a non-empty string' });
    }

    const newDiagnostic = new Diagnostic({
      factorsRisks,
      caseName: caseId,
      name,
      description,
      severity,
      dateDiagnosed,
      treatmentPlan
    });

    const savedDiagnostic = await newDiagnostic.save();

    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { $push: { diagnostics: savedDiagnostic._id } },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(201).json(savedDiagnostic);
  } catch (error) {
    console.error('Error adding diagnostic:', error);
    res.status(400).json({ error: error.message });
  }
};

const viewDiagnostics = async (req, res) => {
  const { caseId } = req.params;
  console.log('Fetching diagnostics for caseId:', caseId); 
  try {
    const caseItem = await Case.findById(caseId).populate('diagnostics');
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(caseItem.diagnostics); 
  } catch (error) {
    console.error('Error viewing diagnostics:', error);
    res.status(400).json({ error: error.message });
  }
};

const addTreatment = async (req, res) => {
  const { caseId } = req.params;
  const { hospitalisation, maintienTemperature, monitorageCardioRespiratoire } = req.body;
  try {
    console.log('Received caseId:', caseId);

    const newTreatment = new Traitement({
      hospitalisation,
      maintienTemperature,
      monitorageCardioRespiratoire
    });

    const savedTreatment = await newTreatment.save();

    await Case.findByIdAndUpdate(caseId, { $push: { treatments: savedTreatment._id } });

    res.status(201).json(savedTreatment);
  } catch (error) {
    console.error('Error adding treatment:', error);
    res.status(400).json({ error: error.message });
  }
};

const viewTreatments = async (req, res) => {
  const { caseId } = req.params;

  try {
    const caseItem = await Case.findById(caseId)
      .populate({
        path: 'treatments',
        populate: {
          path: 'medications.medicament', 
          model: 'Medicament', 
          select: 'nom', 
        }
      });

    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.status(200).json(caseItem.treatments); 
  } catch (error) {
    console.error('Error viewing treatments:', error);
    res.status(400).json({ error: error.message });
  }
};

const addSymptom = async (req, res) => {
  const { caseId } = req.params;
  const { fever,hypothermia,hemodynamicSigns,respiratorySigns,
    neurologicalSigns,cutaneousSigns,digestiveSigns,gravity}= req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return res.status(400).json({ error: 'Invalid caseId' });
    }
    const newSymptom = new Symptom({fever,hypothermia,hemodynamicSigns,
      respiratorySigns,neurologicalSigns,cutaneousSigns,
      digestiveSigns,gravity});
    const savedSymptom = await newSymptom.save();

    await Case.findByIdAndUpdate(caseId, { $push: { symptoms: savedSymptom._id } });

    res.status(201).json(savedSymptom);
  } catch (error) {
    console.error('Error adding symptom:', error);
    res.status(400).json({ error: error.message });
  }
};

const viewSymptoms = async (req, res) => {
  const { caseId } = req.params;
  console.log('Fetching symptom for caseId:', caseId); 
  try {
    const caseItem = await Case.findById(caseId).populate('symptoms');
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(caseItem.symptoms);
  } catch (error) {
    console.error('Error viewing symptoms:', error);
    res.status(400).json({ error: error.message });
  }
};

const addTest = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { type, ...data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Tous les champs requis doivent être remplis pour ajouter un test' });
    }

    let newTest;
    switch (type) {
      case 'Test Bactériologiques':
        newTest = new TestBacteriologiques({ ...data, type, case: caseId });
        break;
      case 'Test Radiologiques':
        newTest = new TestRadiologiques({ ...data, type, case: caseId });
        break;
      case 'Test Biologiques':
        newTest = new TestBiologiques({ ...data, type, case: caseId });
        break;
      default:
        return res.status(400).json({ error: 'Invalid test type' });
    }

    const savedTest = await newTest.save();

    await Case.findByIdAndUpdate(caseId, { $push: { tests: savedTest._id } });

    res.status(201).json(savedTest);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du test :', error);
    res.status(400).json({ error: error.message });
  }
};




const getTests = async (req, res) => {
  try {
    const { caseId } = req.params;
    console.log('Fetching Tests for caseId:', caseId); 

    const caseItem = await Case.findById(caseId).populate('tests');
    if (!caseItem) {
      return res.status(404).json({ error: 'Cas non trouvé' });
    }
    res.status(200).json(caseItem.tests);
  } catch (error) {
    console.error('Erreur lors de la récupération des tests :', error);
    res.status(400).json({ error: error.message });
  }
};

const getDiagnosticsByCaseName = async (req, res) => {
  const { caseName } = req.body;
  try {
    const caseItem = await Case.findOne({ title: caseName }).populate({
      path: 'diagnostics',
      populate: {
        path: 'caseName confirmedDiagnostic',
        select: 'title name'
      }
    });
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(caseItem.diagnostics);
  } catch (error) {
    console.error('Error viewing diagnostics:', error);
    res.status(400).json({ error: error.message });
  }
};

const getCasesByPediatricType = async (req, res) => {
  try {
    const { pediatricType } = req.params;

    if (!pediatricType) {
      return res.status(400).json({ error: 'Pediatric type is required'});
    }

    const cases = await Case.find({ pediatricType }).populate('diagnostics');

    if (!cases || cases.length === 0) {
      return res.status(404).json({ error: 'No cases found for the given pediatric type' });
    }

    res.status(200).json(cases);
  } catch (error) {
    console.error('Error getting cases by pediatric type:', error);
    res.status(400).json({ error: error.message });
  }
};

  const SearchCaseByTitle = async (req ,res) =>{
    try{
       const {title} = req.params 
       if(!title){
           res.status(200).json('No data matchs this title')
       }
       const data = await Case.find({title})
       res.status(200).json(data)
    }
    catch(error){
      console.error(error) 
      res.status(500).json({message : 'Internal Server Error'})
    }
  }


const getAllCaseTitles = async (req, res) => {
  try {
    const titles = await Case.find().select('title');
    res.status(200).json(titles);
  } catch (error) {
    console.error('Error getting all case titles:', error);
    res.status(400).json({ error: error.message });
  }
};

const getDiagnosticsGroupedByPediatricType = async (req, res) => {
  try {
    const cases = await Case.find().populate('diagnostics');

    if (!cases.length) {
      return res.status(404).json('No data available');
    }
    const diagnosticsByPediatricType = cases.reduce((acc, caseItem) => {
      const { pediatricType, diagnostics, _id: caseId } = caseItem;
      if (!acc[pediatricType]) {
        acc[pediatricType] = [];
      }
      diagnostics.forEach(diagnostic => {
        acc[pediatricType].push({ caseId, ...diagnostic._doc });
      });
      return acc;
    }, {});

    res.status(200).json(diagnosticsByPediatricType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getPedTypes = async(req ,res) => {
  try {
    const { pediatricType } = req.params;
    const cases = await Case.find({ pediatricType }).select('_id title');
    res.status(200).json(cases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
  
module.exports = {
  addCase,
  viewCases,
  getCase,
  updateCase,
  deleteCase,
  addDiagnostic,
  viewDiagnostics,
  addTreatment,
  viewTreatments,
  addSymptom,
  viewSymptoms,
  addTest,
  getTests,
  getCasesByPediatricType,
  SearchCaseByTitle,
  getAllCaseTitles,
  getDiagnosticsByCaseName,
  getDiagnosticsGroupedByPediatricType,
  getPedTypes
};
