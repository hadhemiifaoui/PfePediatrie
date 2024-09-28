const express = require('express');
const multer = require('multer');
const path = require('path');
const childController = require('../../controllers/patientController/childController');
const requireAuth = require('../../middleware/authmiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.use(requireAuth);

router.get('/peds' , requireAuth, childController.getAllPediatre)

router.post('/add',requireAuth , upload.single('image'), childController.create);
router.get('/', requireAuth, childController.getAllChilds);
router.get('/:id', requireAuth, childController.getChildById);
router.get('/ped/:id', requireAuth, childController.getPedByChildId);

router.put('/:id', requireAuth, childController.update);
router.delete('/:id', requireAuth, childController.remove);
router.get('/parent/:id', requireAuth, childController.getChildrenByParentId);
router.get('/pediatre/:pediatreId/:childId', childController.getChildByPediatreIdAndChildId);

router.get('/pediatre/:pediatreId/parent/:parentId/child', childController.getChildByPediatreAndParent);



module.exports = router;
