const hospitalisationController  = require('../../controllers/patientController/hospitalisationController')
const requireAuth = require('../../middleware/authmiddleware')

const express = require('express')
const router = express.Router()
router.use(requireAuth)

router.post('/add' ,requireAuth , hospitalisationController.createHospitalisation )
router.get('/'  ,requireAuth ,  hospitalisationController.getAllHospitalisations);
router.get('/:id',requireAuth , hospitalisationController.getHosptalisationById)
router.get('/patient/:patientId',requireAuth ,  hospitalisationController.getHopsByPatientId);

router.get('/child/:childId',requireAuth ,  hospitalisationController.getHospitByChildId);

router.put('/:id' , requireAuth, hospitalisationController.update)
router.delete('/:id' , requireAuth, hospitalisationController.remove)
module.exports = router