const medicationController  = require('../../controllers/patientController/medicationController')
const requireAuth = require('../../middleware/authmiddleware')

const express = require('express')
const router = express.Router()
router.use(requireAuth)

router.post('/add' ,requireAuth , medicationController.createMedication )
router.get('/'  ,requireAuth ,  medicationController.getMedications);
router.put('/:id' , requireAuth, medicationController.update)
router.delete('/:id', requireAuth , medicationController.remove)
router.get('/patient/:patientId',requireAuth ,  medicationController.getMedicationyPatientId)
router.get('/child/:childId', requireAuth ,  medicationController.getMedicationByChildId)
router.get('/:id', requireAuth , medicationController.getById)


module.exports = router