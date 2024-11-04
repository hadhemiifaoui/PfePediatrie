const confirmedDiagnosticController = require('../controllers/ConfirmedDiagnosticController')
const requireAuth = require('../middleware/authmiddleware')
const express = require('express')
const router = express.Router()

router.use(requireAuth)

router.post('/add'  ,requireAuth, confirmedDiagnosticController.createConfirmedDiagnostic )
router.get('/'  , requireAuth, confirmedDiagnosticController.getConfirmedDiagnostics);
router.get('/:id',requireAuth, confirmedDiagnosticController.getConfirmedDiagnosticById);
router.put('/:id'  ,requireAuth ,  confirmedDiagnosticController.updateConfirmedDiagnostic);
router.delete('/:id', requireAuth , confirmedDiagnosticController.deleteConfirmedDiagnostic);
router.get('/diagnostic/:diagnosticId',requireAuth , confirmedDiagnosticController.getConfirmedDiagnosticsByDiagnosticId);
router.post('/:diagnosticId/confirm' , requireAuth , confirmedDiagnosticController.confirmDiagnostic)
module.exports = router