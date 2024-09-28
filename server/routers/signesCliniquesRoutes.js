const  SigneCliniquesController = require('../controllers/SigneCliniquesController')

const express = require('express')
const router = express.Router()


router.post('/add'  , SigneCliniquesController.createSignesCliniques )
router.get('/'  ,  SigneCliniquesController.getSignesCliniques);
router.get('/:id'  ,  SigneCliniquesController.getSignesCliniquesById);
router.put('/:id'  ,  SigneCliniquesController.updateSignesCliniques);
router.delete('/:id'  ,  SigneCliniquesController.deleteSignesCliniques);
module.exports = router