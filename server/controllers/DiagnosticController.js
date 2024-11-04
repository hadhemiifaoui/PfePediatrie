const Diagnostic = require('../models/situation_cliniques/Diagnostic');
const ConfirmedDiagnostic = require('../models/situation_cliniques/ConfirmedDiagnostic');
const Case = require('../models/situation_cliniques/case');
const mongoose = require('mongoose');

const record = async (req, res) => {
  try {
    const { factorsRisks, caseName, name, description, confirmed, dateDiagnosed, treatmentPlan } = req.body;

    const newDiagnostic = new Diagnostic({
      factorsRisks,
      caseName,
      name,
      description,
      dateDiagnosed,
      confirmed,
      treatmentPlan,
    });

    const savedDiagnostic = await newDiagnostic.save();
    res.status(201).json(savedDiagnostic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const view = async (req, res) => {
  try {
    const diagnostics = await Diagnostic.find().populate('caseName');
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const  {id}  = req.params;
    const diagnostic = await Diagnostic.findById(id);

    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnostic not found' });
    }

    res.json(diagnostic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDiagnosticData = req.body;

    const updatedDiagnostic = await Diagnostic.findByIdAndUpdate(id, updatedDiagnosticData, { new: true });

    if (!updatedDiagnostic) {
      return res.status(404).json({ message: 'Diagnostic not found' });
    }

    res.json(updatedDiagnostic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDiagnostic = await Diagnostic.findByIdAndDelete(id);

    if (!deletedDiagnostic) {
      return res.status(404).json({ message: 'Diagnostic not found' });
    }

    res.json({ message: 'Diagnostic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const testAllCombinations = async (testBiologiques, testBacteriologiques, testRadiologiques) => {
  try {
    let confirmed = false;

    if (testBiologiques && testBacteriologiques && testRadiologiques) {
      if (
        testBiologiques.hemogramme === 'Normal' &&
        testBiologiques.procalcitonine === 'Low' &&
        testBiologiques.crp === 'Normal'
      ) {
        if (
          testBacteriologiques.ecbu === 'Negative' &&
          testBacteriologiques.pl === 'Localized'
        ) {
          if (
            testRadiologiques.radiographiePulmonaire === 'Normal' &&
            testRadiologiques.asp === 'Normal'
          ) {
            confirmed = true;
          }
        }
      }
    } else {
      console.error('One or more test objects are undefined.');
    }

    return confirmed;
  } catch (error) {
    console.error('Error testing combinations:', error);
    return false;
  }
};

const confirmDiagnostic = async (req, res) => {
  const diagnosticId = req.params.id;

  try {
    const diagnostic = await Diagnostic.findById(diagnosticId);
    if (!diagnostic) {
      return res.status(404).json({ error: 'Diagnostic not found' });
    }

    const { testBiologiques, testBacteriologiques, testRadiologiques } = req.body;

    const confirmed = await testAllCombinations(testBiologiques, testBacteriologiques, testRadiologiques);
    diagnostic.confirmed = confirmed;

    if (confirmed) {
      const confirmedDiagnostic = new ConfirmedDiagnostic({
        diagnostic: diagnostic._id,
      });
      await confirmedDiagnostic.save();
    }

    await diagnostic.save();

    res.status(200).json({ message: 'Diagnostic confirmation updated successfully', diagnostic });
  } catch (error) {
    console.error('Error confirming diagnostic:', error);
    res.status(400).json({ error: error.message });
  }
};


const searchDiagnostic = async (req, res) => {
  try {
      const { caseId } = req.body;

      if (!mongoose.Types.ObjectId.isValid(caseId)) {
          return res.status(400).json({ message: "Invalid caseId" });
      }

      const diagnostics = await Diagnostic.find({ caseName: caseId });

      console.log('Requested caseId:', caseId);
      console.log('Found diagnostics:', diagnostics);

      if (!diagnostics || diagnostics.length === 0) {
          return res.status(404).json({ message: "No diagnostics found" });
      }

      res.status(200).json(diagnostics);
  } catch (error) {
      console.error('Error fetching diagnostics:', error);
      res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = {
  record,
  view,
  getById,
  update,
  remove,
  confirmDiagnostic,
  searchDiagnostic,
};
