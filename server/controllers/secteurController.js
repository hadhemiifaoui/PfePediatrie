const Secteur = require('../models/situation_cliniques/Secteur');
const PediatricCase = require('../models/situation_cliniques/PediatricCase');


const createSecteur = async (req, res) => {
    try {
        console.log(req.body);
        const { nom } = req.body;
        const existingSecteur = await Secteur.findOne({ nom });
        if (existingSecteur) {
            return res.status(400).json({ error: 'Secteur already exists' });
        }
        const newSecteur = new Secteur({ nom });
        await newSecteur.save();
        res.status(201).json(newSecteur);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getSecteurs = async (req, res) => {
    try {
        const secteurs = await Secteur.find().populate('cases', 'title description');
        res.status(200).json(secteurs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getSecteurById = async (req, res) => {
    try {
        const secteur = await Secteur.findById(req.params.id).populate('cases', 'title description');
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        res.status(200).json(secteur);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const updateSecteur = async (req, res) => {
    try {
        const secteur = await Secteur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        res.status(200).json(secteur);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

const deleteSecteur = async (req, res) => {
    try {
        const secteur = await Secteur.findByIdAndDelete(req.params.id);
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        res.status(200).json({ message: 'Secteur deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteCaseFromSecteur = async (req, res) => {
    try {
        const { secteurId, caseId } = req.params;
        const secteur = await Secteur.findById(secteurId);
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        secteur.cases.pull(caseId);
        await secteur.save();
        await PediatricCase.findByIdAndDelete(caseId);
        res.status(200).json({ message: 'Case deleted from secteur' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCaseIntoSector = async (req, res) => {
    try {
        const { secteurId, caseId } = req.params;
        const secteur = await Secteur.findById(secteurId);
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        const updatedCase = await PediatricCase.findByIdAndUpdate(caseId, req.body, { new: true, runValidators: true });
        if (!updatedCase) {
            return res.status(404).json({ message: 'Case not found' });
        }
        res.status(200).json(updatedCase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCaseFromSecteur = async (req, res) => {
    try {
        const { secteurId, caseId } = req.params;
        const secteur = await Secteur.findById(secteurId);
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        const pediatricCase = await PediatricCase.findById(caseId);
        if (!pediatricCase) {
            return res.status(404).json({ message: 'Case not found' });
        }
        res.status(200).json(pediatricCase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getAllCasesFromSecteur = async (req, res) => {
    try {
        const { secteurId } = req.params;
        const secteur = await Secteur.findById(secteurId).populate('cases', 'title description');
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        res.status(200).json(secteur.cases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const addCaseToSecteur = async (req, res) => {
    try {
        const { secteurId, title, description } = req.body;
        const secteur = await Secteur.findById(secteurId);
        if (!secteur) {
            return res.status(404).json({ message: 'Secteur not found' });
        }
        const newCase = new PediatricCase({ title, description });
        await newCase.save();
        secteur.cases.push(newCase._id);
        await secteur.save();
        res.status(201).json(newCase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createSecteur,
    getSecteurs,
    getSecteurById,
    updateSecteur,
    deleteSecteur,
    deleteCaseFromSecteur,
    addCaseToSecteur,
    getCaseFromSecteur,
    updateCaseIntoSector,
    getAllCasesFromSecteur
};
