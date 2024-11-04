const  signeGraviteController = require('../controllers/signeGraviteController')

const express = require('express')
const router = express.Router()


router.post('/add'  , signeGraviteController.createSigneGravite )
router.get('/'  ,  signeGraviteController.getSignesGravite);
router.get('/:id'  ,  signeGraviteController.getSigneGraviteById);
router.put('/:id'  ,  signeGraviteController.updateSigneGravite);
router.delete('/:id'  ,  signeGraviteController.updateSigneGravite);
module.exports = router