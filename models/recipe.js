const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
//this syntax is called destructuring
// const { Schema } = mongoose *exact same thign as the following line*
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

	
const recipeSchema = new Schema({
  title: { type: String, 
    required: true },
  steps: [{ type: String, 
    required: true }],
  ingredients: [{ type: String, 
    required: true }],
  reviews: {
    type: [reviewSchema],
    default: []
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);