const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authmiddleware')
const symptomController = require('../controllers/symptomsController')

router.use(requireAuth)



router.post('/add', requireAuth , symptomController.record);

router.get('/',requireAuth , symptomController.view);

router.get('/:id' ,requireAuth , symptomController.getById)

router.put('/:id',requireAuth , symptomController.update);

router.delete('/:id',requireAuth , symptomController.remove);
router.get('/symp/search/:id' , requireAuth , symptomController.searchCaseBySymptomId);
module.exports = router;
