const SigneGravite = require('../models/situation_cliniques/SigneGravite');

// Créer un nouveau signe de gravité
const createSigneGravite = async (req, res) => {
    try {
        const signeGravite = new SigneGravite(req.body);
        await signeGravite.save();
        res.status(201).json(signeGravite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer tous les signes de gravité
const getSignesGravite = async (req, res) => {
    try {
        const signesGravite = await SigneGravite.find();
        res.status(200).json(signesGravite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un signe de gravité par ID
const getSigneGraviteById = async (req, res) => {
    try {
        const signeGravite = await SigneGravite.findById(req.params.id);
        if (!signeGravite) {
            return res.status(404).json({ message: 'Signe de gravité not found' });
        }
        res.status(200).json(signeGravite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un signe de gravité par ID
const updateSigneGravite = async (req, res) => {
    try {
        const signeGravite = await SigneGravite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!signeGravite) {
            return res.status(404).json({ message: 'Signe de gravité not found' });
        }
        res.status(200).json(signeGravite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un signe de gravité par ID
const deleteSigneGravite = async (req, res) => {
    try {
        const signeGravite = await SigneGravite.findByIdAndDelete(req.params.id);
        if (!signeGravite) {
            return res.status(404).json({ message: 'Signe de gravité not found' });
        }
        res.status(200).json({ message: 'Signe de gravité deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createSigneGravite , getSignesGravite, getSigneGraviteById ,updateSigneGravite ,  deleteSigneGravite}