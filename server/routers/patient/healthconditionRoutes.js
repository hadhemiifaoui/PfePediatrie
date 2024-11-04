const  healthConditionController = require('../../controllers/patientController/healthConditionController')
const requireAuth = require('../../middleware/authmiddleware')

const express = require('express')
const router = express.Router()
router.use(requireAuth)

router.post('/add' , requireAuth , healthConditionController.createHealthCondition )
router.get('/'  ,requireAuth ,  healthConditionController.getHealthConditions);
router.get('/:id',requireAuth , healthConditionController.getHealthConditionById)
router.put('/:id' ,requireAuth , healthConditionController.update)
router.delete('/:id' ,requireAuth , healthConditionController.remove)
router.get('/child/:childId' ,requireAuth, healthConditionController.getHealthConditionsByChildId)

router.get('/med/:id',requireAuth,  healthConditionController.getMedication);
router.get('/patient/:patientId',requireAuth ,  healthConditionController.getHealthConditionByPatientId);

module.exports = router