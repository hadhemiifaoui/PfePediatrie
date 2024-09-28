const  MedicamentController = require('../controllers/MedicamentController')
const requireAuth = require('../middleware/authmiddleware')

const express = require('express')
const router = express.Router()
router.use(requireAuth)


router.post('/add' ,requireAuth, MedicamentController.createMedicament )
router.get('/'    ,requireAuth ,  MedicamentController.getMedicaments);
router.get('/:id'  ,requireAuth, MedicamentController.getMedicamentById);
router.put('/:id'   ,requireAuth,MedicamentController.updateMedicament);
router.delete('/:id'  ,requireAuth ,MedicamentController.deleteMedicament);
module.exports = router