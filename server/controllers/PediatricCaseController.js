const PediatricCase = require('../models/situation_cliniques/PediatricCase');
const Secteur = require('../models/situation_cliniques/Secteur');

const createPediatricCase = async (req, res) => {
    try {
        const { title, description, secteur } = req.body;
        const existedsecteur = await Secteur.findOne({ nom: secteur });
        if (!existedsecteur) {
            return res.status(404).json({ error: 'Secteur not found' });
        }
        const newCase = new PediatricCase({
            title,
            description,
            secteur
        });

        // Sauvegarder le nouveau cas
        await newCase.save();

        // Ajouter le cas pédiatrique au secteur
        existedsecteur.cases.push(newCase._id);
        await existedsecteur.save();

        res.status(201).json(newCase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Récupérer tous les cas pédiatriques
const getPediatricCases = async (req, res) => {
    try {
        const pediatricCases = await PediatricCase.find();
        res.status(200).json(pediatricCases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Récupérer un cas pédiatrique par ID
const getPediatricCaseById = async (req, res) => {
    try {
        const pediatricCase = await PediatricCase.findById(req.params.id);
        if (!pediatricCase) {
            return res.status(404).json({ message: 'Pediatric Case not found' });
        }
        res.status(200).json(pediatricCase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un cas pédiatrique par ID
const updatePediatricCase = async (req, res) => {
    try {
        const pediatricCase = await PediatricCase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pediatricCase) {
            return res.status(404).json({ message: 'Pediatric Case not found' });
        }
        res.status(200).json(pediatricCase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un cas pédiatrique par ID
const deletePediatricCase = async (req, res) => {
    try {
        const pediatricCase = await PediatricCase.findByIdAndDelete(req.params.id);
        if (!pediatricCase) {
            return res.status(404).json({ message: 'Pediatric Case not found' });
        }
        res.status(200).json({ message: 'Pediatric Case deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createPediatricCase,
    getPediatricCases,
    getPediatricCaseById,
    updatePediatricCase,
    deletePediatricCase,
   // getPediatricCasesGroupBySecteur
};



/*const getPediatricCasesGroupBySecteur = async (req, res) => {
    try {
        const casesGroupedBySecteur = await Secteur.aggregate([
            {
                $group: {
                    _id: "$secteur", // Group by the 'secteur' field
                    cases: {
                        $push: { title: "$title", description: "$description" }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    secteur: "$_id", // Rename '_id' to 'secteur'
                    cases: 1
                }
            }
        ]);

        res.status(200).json(casesGroupedBySecteur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};*/