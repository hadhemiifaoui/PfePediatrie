const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backupController')

router.get('/', backupController.createBackup);

router.post('/restore', backupController.restoreBackup);

router.get('/list', backupController.listBackups);


router.get('/download/:filename', backupController.downloadBackup);
router.delete('/backups/delete/:filename', backupController.deleteBackup);

module.exports = router;

module.exports = router;
