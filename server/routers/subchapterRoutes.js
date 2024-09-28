const subchapterController = require('../controllers/subChapterController')
const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/authmiddleware')
router.use(requireAuth)

router.post('/add' ,requireAuth , subchapterController.createSubChapter )
router.get('/', requireAuth , subchapterController.getAllSubChapters);
router.get('/:id', requireAuth , subchapterController.getSubChapterById);
router.put('/:id',requireAuth ,  subchapterController.updateSubChapter);
router.delete('/:id',requireAuth , subchapterController.deleteSubChapter);

module.exports = router