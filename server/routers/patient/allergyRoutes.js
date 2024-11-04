const allergyController  = require('../../controllers/patientController/allergyController')
const requireAuth = require('../../middleware/authmiddleware')

const express = require('express')
const router = express.Router()
router.use(requireAuth)

router.post('/add' ,requireAuth , allergyController.createAllergy )
router.get('/'  , requireAuth, allergyController.getAllergies);
router.get('/:id',requireAuth, allergyController.getAllergyById)
router.get('/child/:childId' ,requireAuth, allergyController.getAllergiesByChildId)
router.get('/patient/:patientId',requireAuth ,  allergyController.getAllergyByPatientId)
router.put('/:id' ,requireAuth, allergyController.update)
router.delete('/:id' ,requireAuth, allergyController.remove)
router.get('/med/:id',requireAuth ,  allergyController.getMedication);

module.exports = router