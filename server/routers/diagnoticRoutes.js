const  DiagnosticController = require('../controllers/DiagnosticController')

const express = require('express')
const router = express.Router()

router.post('/add'  , DiagnosticController.record )
router.get('/'  ,  DiagnosticController.view);
router.get('/:id'  ,  DiagnosticController.getById);
router.put('/:id'  ,  DiagnosticController.update);
router.delete('/:id'  ,  DiagnosticController.remove);
router.post('/:id/confirm', DiagnosticController.confirmDiagnostic);
router.post('/search' , DiagnosticController.searchDiagnostic);
module.exports = router