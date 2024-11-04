const Medicament = require('../models/situation_cliniques/Medicament');

const createMedicament = async (req, res) => {
    try {
        const medicament = new Medicament(req.body);
        await medicament.save();
        res.status(201).json(medicament);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMedicaments = async (req, res) => {
    try {
        const medicaments = await Medicament.find();
        res.status(200).json(medicaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMedicamentById = async (req, res) => {
    try {
        const medicament = await Medicament.findById(req.params.id);
        if (!medicament) {
            return res.status(404).json({ message: 'Medicament nest pas trouvé ' });
        }
        res.status(200).json(medicament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMedicament = async (req, res) => {
    try {
        const medicament = await Medicament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!medicament) {
            return res.status(404).json({ message: 'Medicament nest pas trouvé ' });
        }
        res.status(200).json(medicament);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

 const deleteMedicament = async (req, res) => {
    try {
        const medicament = await Medicament.findByIdAndDelete(req.params.id);
        if (!medicament) {
            return res.status(404).json({ message: 'Medicament nest pas trouvé ' });
        }
        res.status(200).json({ message: 'Medicament supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {createMedicament , getMedicaments ,getMedicamentById ,updateMedicament ,deleteMedicament}