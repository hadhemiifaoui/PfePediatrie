const  PediatricCaseController = require('../controllers/PediatricCaseController')

const express = require('express')
const router = express.Router()

const requireAuth = require('../middleware/authmiddleware')


router.use(requireAuth)

router.post('/add' ,requireAuth , PediatricCaseController.createPediatricCase )
router.get('/'  , requireAuth, PediatricCaseController.getPediatricCases);
router.get('/:id'  ,requireAuth ,  PediatricCaseController.getPediatricCaseById);
router.put('/:id'  ,requireAuth ,   PediatricCaseController.updatePediatricCase);
router.delete('/:id', requireAuth,  PediatricCaseController.deletePediatricCase);
module.exports = router