
const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/register', userController.signUp);
router.post('/login', userController.login);
router.post('/request-password-reset',requireAuth , userController.requestPasswordReset);
router.post('/reset/:token',requireAuth , userController.resetPassword);
router.put('/changepassword', requireAuth, userController.changePassword);

router.use(requireAuth);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/byrole/:role',requireAuth, userController.getUserByRole);
router.get('/',requireAuth, userController.getAllUsers);
router.get('/:id',requireAuth, userController.getUserById);
router.put('/:id',requireAuth, userController.updateUser);
router.delete('/:id',requireAuth, userController.deleteUser);
router.post('/add',requireAuth, userController.addNewUser);
router.post('/:id/createprofile',requireAuth, upload.single('image'), userController.CreatePedProfile);
router.put('/:id/createprofile',requireAuth, upload.single('image'), userController.CreatePedProfile);
router.get('/pediatre/:id/children', requireAuth, userController.getPediatreChildren); 
router.delete('/deleteAccount', requireAuth, userController.deleteAccounte);
//router.put('/toggleActive', requireAuth, userController.toggleUserActivation);

router.patch('/toggleActive', requireAuth, userController.toggleUserActivation);

router.delete('/pediatricians/:pediatreId/children/:childId', requireAuth, userController.unlinkChildFromPediatre);

module.exports = router;

