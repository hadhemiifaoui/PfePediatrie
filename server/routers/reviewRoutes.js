const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.post('/', reviewController.addReview);
router.get('/', reviewController.getAllReviews); 
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview); 
router.delete('/:id', reviewController.deleteReview); 

module.exports = router;
