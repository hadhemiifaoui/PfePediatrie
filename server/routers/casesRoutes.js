const casesController = require('../controllers/casesController')
const requireAuth = require('../middleware/authmiddleware')
const express = require('express')
const router = express.Router()

router.use(requireAuth)


router.post('/add',requireAuth , casesController.addCase);
router.get('/',requireAuth , casesController.viewCases);
router.get('/:id',requireAuth , casesController.getCase);
router.put('/:id', requireAuth,casesController.updateCase);
router.get('/pediatricType/:pediatricType', requireAuth,casesController.getCasesByPediatricType);
router.get('/title/:title', requireAuth ,casesController.SearchCaseByTitle);
router.get('/ss/titles',  requireAuth ,casesController.getAllCaseTitles);
router.delete('/:id',requireAuth , casesController.deleteCase);


router.get('/ped/:pediatricType' ,requireAuth , casesController.getDiagnosticsGroupedByPediatricType )
router.get('/search/:pediatricType' ,requireAuth , casesController.getPedTypes )


router.post('/:caseId/diagnostics/add',requireAuth , casesController.addDiagnostic);
router.get('/:caseId/diagnostics',requireAuth , casesController.viewDiagnostics);
router.post('/diagnostics/search',requireAuth , casesController.getDiagnosticsByCaseName); 

router.post('/:caseId/treatments/add',requireAuth , casesController.addTreatment);
router.get('/:caseId/treatments',requireAuth , casesController.viewTreatments);

router.post('/:caseId/symptoms/add',requireAuth , casesController.addSymptom);
router.get('/:caseId/symptoms',requireAuth , casesController.viewSymptoms);

router.post('/:caseId/tests/add',requireAuth , casesController.addTest);
router.get('/:caseId/tests',requireAuth , casesController.getTests);


module.exports = router;