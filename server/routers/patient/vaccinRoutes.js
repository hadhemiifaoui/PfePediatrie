const vaccinController  = require('../../controllers/patientController/vaccinController')
const requireAuth = require('../../middleware/authmiddleware')

const express = require('express')
const router = express.Router()
router.use(requireAuth)

router.post('/add' , requireAuth , vaccinController.createVaccination )
router.get('/'  ,requireAuth ,  vaccinController.getAllVaccinations);
router.get('/:id',requireAuth , vaccinController.getVaccinationById)
router.get('/patient/:patientId',requireAuth ,  vaccinController.getVaccinByPatientId)
router.get('/child/:childId',requireAuth ,  vaccinController.getVaccByChildId)

router.put('/:id' ,requireAuth  , vaccinController.update)
router.delete('/:id' , requireAuth, vaccinController.remove)
module.exports = router