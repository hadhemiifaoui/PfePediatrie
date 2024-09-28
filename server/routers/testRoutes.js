const express = require('express');
const router = express.Router();

const testController = require('../controllers/testController');

router.post('/add', testController.addTest);
router.get('/', testController.viewTests);
router.put('/:id', testController.updateTest);
router.get('/:id', testController.getById);

router.delete('/:id', testController.removeTest);

module.exports = router;
