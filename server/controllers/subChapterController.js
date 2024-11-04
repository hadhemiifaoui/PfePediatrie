const Subchapter = require('../models/situation_cliniques/subchapter');
const Chapter = require('../models/situation_cliniques/chapter');

// Create a new subchapter
const createSubChapter = async (req, res) => {
  try {
    const newSubchapter = new Subchapter(req.body);
    await newSubchapter.save();

    // Update the associated chapter to include this subchapter
    await Chapter.findByIdAndUpdate(newSubchapter.chapter, { $push: { subchapters: newSubchapter._id } });

    res.status(201).send(newSubchapter);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all subchapters with populated chapters
const getAllSubChapters = async (req, res) => {
  try {
    const subchapters = await Subchapter.find().populate('chapter');
    res.status(200).send(subchapters);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get a specific subchapter by ID with populated chapter
const getSubChapterById = async (req, res) => {
  try {
    const subchapter = await Subchapter.findById(req.params.id).populate('chapter');
    if (!subchapter) {
      return res.status(404).send({ error: 'Subchapter not found' });
    }
    res.status(200).send(subchapter);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update a subchapter by ID
const updateSubChapter = async (req, res) => {
  try {
    const subchapter = await Subchapter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!subchapter) {
      return res.status(404).send({ error: 'Subchapter not found' });
    }
    res.status(200).send(subchapter);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a subchapter by ID
const deleteSubChapter = async (req, res) => {
  try {
    const subchapter = await Subchapter.findByIdAndDelete(req.params.id);
    if (!subchapter) {
      return res.status(404).send({ error: 'Subchapter not found' });
    }

    // Update the associated chapter to remove this subchapter
    await Chapter.findByIdAndUpdate(subchapter.chapter, { $pull: { subchapters: subchapter._id } });

    res.status(200).send(subchapter);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createSubChapter, getAllSubChapters, getSubChapterById, updateSubChapter, deleteSubChapter };
