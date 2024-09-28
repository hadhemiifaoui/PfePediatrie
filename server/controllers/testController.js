
const Test = require('../models/situation_cliniques/test');
const TestBiologiques = require('../models/situation_cliniques/TestBiologiques');
const TestBacteriologiques = require('../models/situation_cliniques/TestBacteriologique');
const TestRadiologiques = require('../models/situation_cliniques/TestRadiologiques');

const addTest = async (req, res) => {
  const { type, ...testData } = req.body;

  try {
    let newTest;
    switch (type) {
      case 'TestRadiologiques':
        newTest = new TestRadiologiques({ type, ...testData });
        break;
      case 'TestBacteriologiques':
        newTest = new TestBacteriologiques({ type, ...testData });
        break;
      case 'TestBiologiques':
        newTest = new TestBiologiques({ type, ...testData });
        break;
      default:
        return res.status(400).json({ error: 'Invalid test type' });
    }

    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (error) {
    console.error('Error adding test:', error);
    res.status(400).json({ error: error.message });
  }
};

const viewTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    console.error('Error viewing tests:', error);
    res.status(400).json({ error: error.message });
  }
};

const updateTest = async (req, res) => {
  const { id } = req.params;
  const { type, ...updateData } = req.body;

  try {
    let updatedTest;
    switch (type) {
      case 'TestRadiologiques':
        updatedTest = await TestRadiologiques.findByIdAndUpdate(id, updateData, { new: true });
        break;
      case 'TestBacteriologiques':
        updatedTest = await TestBacteriologiques.findByIdAndUpdate(id, updateData, { new: true });
        break;
      case 'TestBiologiques':
        updatedTest = await TestBiologiques.findByIdAndUpdate(id, updateData, { new: true });
        break;
      default:
        console.log('Invalid test type:', type); 
        return res.status(400).json({ error: 'Invalid test type' });
    }

    if (!updatedTest) {
      console.log('Test not found for ID:', id); 
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json(updatedTest);
  } catch (err) {
    console.error('Error updating test:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





const getById = async (req ,res ) => {
  try {
    const { id } = req.params;
    const data = await Test.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const removeTest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTest = await Test.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addTest, viewTests, updateTest, removeTest , getById };

