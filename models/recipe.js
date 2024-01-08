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
// const recipes = [
//     {id: 125223, recipe: 'Chicken Marsala'},
//     {id: 127904, recipe: 'Chicken Curry'},
//     {id: 139608, recipe: 'Country Mashed Potatoes'}
// ];

// module.exports = {
//     create,
//     deleteOne
//   };
  
//   function deleteOne(id) {
//     id = parseInt(id);
//     // Find the index for the todo
//     const idx = recipes.findIndex(recipe => recipe.id === id);
//     recipes.splice(idx, 1);
//   }
  
//   function create(recipe) {
//     // Add the id
//     recipe.id = Date.now() % 1000000;
//     recipes.push(recipe);
//   }
  
//   function getOne(id) {
//     id = parseInt(id);
//     return recipes.find(recipe => recipe.id === id);
//   }
  
//   function getAll() {
//     return recipes;
//   }

//1. dredge chicken, 2. heat oil in pan then add dredged chicken and fry one side each for 2 minutes long, 3. deglaze with red wine, 4. add sauteed red onion butter and cream, 5. let simmer and reduce for 4 minutes until sauce is thick and creamy, 6. plate boiled spaghetti first then layer the sauce on top and finally put the chicken on top, 7. sprinkle with parsley
//1/4 cup red wine, 2 chicken breast, 1 TBSP Butter, 14 cup heavy cream, 2 TSP minced Garlic, Flour, 1 Egg, 1/4 Red Onion Julienned, 1 package spaghetti, 2 TSP Salt, 1 TBSP Olive Oil