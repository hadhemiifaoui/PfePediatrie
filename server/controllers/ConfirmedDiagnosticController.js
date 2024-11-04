const ConfirmedDiagnostic = require('../models/situation_cliniques/ConfirmedDiagnostic');
const Diagnostic = require('../models/situation_cliniques/Diagnostic');
const TestBiologiques = require('../models/situation_cliniques/TestBiologiques');
const TestBacteriologiques = require('../models/situation_cliniques/TestBacteriologique');
const TestRadiologiques = require('../models/situation_cliniques/TestRadiologiques');
const Test = require('../models/situation_cliniques/test')


const createConfirmedDiagnostic = async (req, res) => {
    try {
        const { diagnosticId, tests } = req.body;

        const foundDiagnostic = await Diagnostic.findById(diagnosticId);
        if (!foundDiagnostic) {
            return res.status(404).json({ message: 'Diagnostic not found' });
        }

        const validTests = await Promise.all(tests.map(async (test) => {
            let testModel;
            switch (test.type) {
                case 'TestBiologiques':
                    testModel = TestBiologiques;
                    break;
                case 'TestBactériologiques':
                    testModel = TestBacteriologiques;
                    break;
                case 'TestRadiologiques':
                    testModel = TestRadiologiques;
                    break;
                default:
                    throw new Error('Invalid test type');
            }
            const foundTest = await testModel.findById(test.testId);
            if (!foundTest) {
                throw new Error(`Test of type ${test.type} with ID ${test.testId} not found`);
            }
            return { type: test.type, test: test.testId };
        }));

        const confirmedDiagnostic = new ConfirmedDiagnostic({
            diagnostic: diagnosticId,
            tests: validTests,
            confirmed: req.body.confirmed
        });

        await confirmedDiagnostic.save();
        res.status(201).json(confirmedDiagnostic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getConfirmedDiagnostics = async (req, res) => {
    try {
        const confirmedDiagnostics = await ConfirmedDiagnostic.find().populate('diagnostic');
        res.status(200).json(confirmedDiagnostics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConfirmedDiagnosticById = async (req, res) => {
    try {
        const confirmedDiagnostic = await ConfirmedDiagnostic.findById(req.params.id)
            .populate('diagnostic')
            .populate('tests.test');
        if (!confirmedDiagnostic) {
            return res.status(404).json({ message: 'Confirmed Diagnostic not found' });
        }
        res.status(200).json(confirmedDiagnostic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateConfirmedDiagnostic = async (req, res) => {
    try {
        const { diagnostic, tests } = req.body;

        const foundDiagnostic = await Diagnostic.findById(diagnostic);
        if (!foundDiagnostic) {
            return res.status(404).json({ message: 'Diagnostic not found' });
        }

        const validTests = await Promise.all(tests.map(async (test) => {
            let testModel;
            switch (test.type) {
                case 'TestBiologiques':
                    testModel = TestBiologiques;
                    break;
                case 'TestBactériologiques':
                    testModel = TestBacteriologiques;
                    break;
                case 'TestRadiologiques':
                    testModel = TestRadiologiques;
                    break;
                default:
                    throw new Error('Invalid test type');
            }
            const foundTest = await testModel.findById(test.test);
            if (!foundTest) {
                throw new Error(`Test of type ${test.type} with ID ${test.test} not found`);
            }
            return { type: test.type, test: test.test };
        }));

        const updatedConfirmedDiagnostic = await ConfirmedDiagnostic.findByIdAndUpdate(
            req.params.id,
            {
                diagnostic,
                tests: validTests,
                confirmed: req.body.confirmed
            },
            { new: true, runValidators: true }
        );

        if (!updatedConfirmedDiagnostic) {
            return res.status(404).json({ message: 'Confirmed Diagnostic not found' });
        }
        res.status(200).json(updatedConfirmedDiagnostic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteConfirmedDiagnostic = async (req, res) => {
    try {
        const confirmedDiagnostic = await ConfirmedDiagnostic.findByIdAndDelete(req.params.id);
        if (!confirmedDiagnostic) {
            return res.status(404).json({ message: 'Confirmed Diagnostic not found' });
        }
        res.status(200).json({ message: 'Confirmed Diagnostic deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 const getConfirmedDiagnosticsByDiagnosticId = async (req, res) => {
    const { diagnosticId } = req.params;
  
    try {
      const confirmedDiagnostics = await ConfirmedDiagnostic.find({ diagnostic: diagnosticId });
      if (!confirmedDiagnostics) {
        return res.status(404).json({ message: 'Confirmed diagnostics not found' });
      }
      res.status(200).json(confirmedDiagnostics);
    } catch (error) {
      console.error('Error fetching confirmed diagnostics:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const confirmDiagnostic = async (req, res) => {
    const diagnosticId = req.params.diagnosticId;

    try {
        const diagnostic = await Diagnostic.findById(diagnosticId).exec();
        const tests = await Test.find({ diagnostic: diagnosticId }).exec();

        const biologiqueTest = tests.find(test => test.type === 'TestBiologiques');
        const bacteriologiqueTest = tests.find(test => test.type === 'TestBacteriologiques');
        const radiologiqueTest = tests.find(test => test.type === 'TestRadiologiques');

        const allTestsConfirmed = biologiqueTest.confirmed && bacteriologiqueTest.confirmed && radiologiqueTest.confirmed;

        if (allTestsConfirmed) {
            const confirmedDiagnostic = new ConfirmedDiagnostic({
                diagnostic: diagnosticId,
                tests: tests.map(test => ({ type: test.type, test: test._id })),
                confirmed: true
            });

            await confirmedDiagnostic.save();

            diagnostic.confirmed = true;
            await diagnostic.save();

            res.status(200).json(confirmedDiagnostic);
        } else {
            res.status(400).json({ error: 'Not all tests are confirmed.' });
        }
    } catch (error) {
        console.error('Error confirming diagnostic:', error);
        res.status(500).json({ error: 'Failed to confirm diagnostic.' });
    }
};
module.exports = {
    createConfirmedDiagnostic,
    getConfirmedDiagnostics,
    getConfirmedDiagnosticById,
    updateConfirmedDiagnostic,
    deleteConfirmedDiagnostic,
    getConfirmedDiagnosticsByDiagnosticId,
    confirmDiagnostic
};
