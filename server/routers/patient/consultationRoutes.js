const express = require('express');

const consultationController = require('../../controllers/patientController/consultationController')

const requireAuth = require('../../middleware/authmiddleware');


const router = express.Router();

router.post('/create',requireAuth , consultationController.createConsultation);
router.get('/', requireAuth ,consultationController.getAll);

router.get('/:id', requireAuth ,consultationController.getConsultation);
router.post('/request', requireAuth, consultationController.requestConsultation);
router.post('/join/:roomId', requireAuth, consultationController.joinConsultation); // Ensure this matches the updated controller

router.post('/schedule', requireAuth, consultationController.scheduleConsultation);

module.exports = router;
