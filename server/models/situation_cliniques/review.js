const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date, default: Date.now },
  image : {type : String}
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
