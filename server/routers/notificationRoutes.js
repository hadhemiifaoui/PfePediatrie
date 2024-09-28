const express = require('express');
const multer = require('multer');
const path = require('path');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), notificationController.createNotification);

router.get('/', notificationController.getNotifications);

router.patch('/:id', notificationController.markAsRead);

router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
