const Traitement = require('../models/situation_cliniques/Traintement');
const Case = require('../models/situation_cliniques/case');
const Diagnostic = require('../models/situation_cliniques/Diagnostic');
const Medicament = require('../models/situation_cliniques/Medicament');

const createTraitement = async (req, res) => {
    try {
        const { hospitalisation, maintienTemperature, monitorageCardioRespiratoire, medications,
            followUpInstructions, dietaryRestrictions, psychologicalSupport, additionalNotes, diagnostic, caseName } = req.body;

        const newTraitement = new Traitement({
            hospitalisation, maintienTemperature, monitorageCardioRespiratoire, medications,
            followUpInstructions, dietaryRestrictions, psychologicalSupport, additionalNotes, diagnostic, caseName
        });

        const savedTraitement = await newTraitement.save();

        await Case.findByIdAndUpdate(
            caseName,
            { $push: { treatments: savedTraitement._id } },
            { new: true }
        );

        await Diagnostic.findByIdAndUpdate(
            diagnostic,
            { $push: { treatement: savedTraitement._id } },
            { new: true }
        );

        res.status(201).json(savedTraitement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTraitements = async (req, res) => {
    try {
        const traitements = await Traitement.find().populate('medications.medicament');
        const transformedTraitements = traitements.map(traitement => {
            return {
                ...traitement.toObject(), 
                medications: traitement.medications.map(medication => ({
                    ...medication,
                    medicamentName: medication.medicament ? medication.medicament.nom : null 
                }))
            };
        });

        res.status(200).json(transformedTraitements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTraitementById = async (req, res) => {
    try {
        const traitement = await Traitement.findById(req.params.id).select('medications');
        if (!traitement) {
            return res.status(404).json({ message: 'Traitement not found' });
        }
        res.status(200).json(traitement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTraitement = async (req, res) => {
    try {
        const traitement = await Traitement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!traitement) {
            return res.status(404).json({ message: 'Traitement not found' });
        }
        res.status(200).json(traitement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTraitement = async (req, res) => {
    try {
        const traitement = await Traitement.findByIdAndDelete(req.params.id);
        if (!traitement) {
            return res.status(404).json({ message: 'Traitement not found' });
        }
        res.status(200).json({ message: 'Traitement deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTraitement, getTraitements, getTraitementById, updateTraitement, deleteTraitement };
