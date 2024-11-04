const SignesCliniques = require('../models/situation_cliniques/SigneCliniques');
const Secteur = require('../models/situation_cliniques/Secteur');
const PediatricCase = require('../models/situation_cliniques/PediatricCase');

// Créer un nouveau signe clinique
const createSignesCliniques = async (req, res) => {
    try {
        const { name, sectorName, pediatricCaseTitle, fievre, hypothermie, signesHemodynamiques, signesRespiratoires, signesNeurologiques, signesCutanes, signesDigestifs, gravité } = req.body;

        const sectorDoc = await Secteur.findOne({ nom: sectorName });
        const pediatricCaseDoc = await PediatricCase.findOne({ title: pediatricCaseTitle });

        if (!sectorDoc || !pediatricCaseDoc) {
            return res.status(404).json({ error: 'Sector or Pediatric Case not found' });
        }

        const newSignesCliniques = new SignesCliniques({
            name,
            sector: sectorDoc._id,
            pediatricCase: pediatricCaseDoc._id,
            fievre,
            hypothermie,
            signesHemodynamiques,
            signesRespiratoires,
            signesNeurologiques,
            signesCutanes,
            signesDigestifs,
            gravité
        });


        await newSignesCliniques.save();
        res.status(201).json(newSignesCliniques);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer tous les signes cliniques
const getSignesCliniques = async (req, res) => {
    try {
        const signesCliniques = await SignesCliniques.find();
        res.status(200).json(signesCliniques);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un signe clinique par ID
const getSignesCliniquesById = async (req, res) => {
    try {
        const signesCliniques = await SignesCliniques.findById(req.params.id);
        if (!signesCliniques) {
            return res.status(404).json({ message: 'Signes Cliniques not found' });
        }
        res.status(200).json(signesCliniques);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un signe clinique par ID
const updateSignesCliniques = async (req, res) => {
    try {
        const { sectorName, pediatricCaseName, ...updateData } = req.body;

        const sectorDoc = await Secteur.findOne({ nom: sectorName });
        const pediatricCaseDoc = await PediatricCase.findOne({ title: pediatricCaseName });

        if (!sectorDoc || !pediatricCaseDoc) {
            return res.status(404).json({ error: 'Sector or Pediatric Case not found' });
        }

        const signesCliniques = await SignesCliniques.findByIdAndUpdate(
            req.params.id,
            {
                sector: sectorDoc._id,
                pediatricCase: pediatricCaseDoc._id,
                ...updateData
            },
            { new: true, runValidators: true }
        );

        if (!signesCliniques) {
            return res.status(404).json({ message: 'Signes Cliniques not found' });
        }

        res.status(200).json(signesCliniques);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un signe clinique par ID
const deleteSignesCliniques = async (req, res) => {
    try {
        const signesCliniques = await SignesCliniques.findByIdAndDelete(req.params.id);
        if (!signesCliniques) {
            return res.status(404).json({ message: 'Signes Cliniques not found' });
        }
        res.status(200).json({ message: 'Signes Cliniques deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSignesCliniques,
    getSignesCliniques,
    getSignesCliniquesById,
    updateSignesCliniques,
    deleteSignesCliniques
};
