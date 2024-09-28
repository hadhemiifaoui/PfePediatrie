const  TraitementController = require('../controllers/TraitementController')
const requireAuth = require('../middleware/authmiddleware')

const express = require('express')
const router = express.Router()
router.use(requireAuth)

router.post('/add', requireAuth  , TraitementController.createTraitement )
router.get('/'  , requireAuth ,  TraitementController.getTraitements);
router.get('/:id'  , requireAuth ,  TraitementController.getTraitementById);
router.put('/:id'  , requireAuth ,  TraitementController.updateTraitement);
router.delete('/:id'  ,requireAuth ,  TraitementController.deleteTraitement);
module.exports = router