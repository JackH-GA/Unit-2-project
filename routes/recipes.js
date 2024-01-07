const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const recipes = require('../controllers/recipes');

// All actual paths start with "/recipes"

// GET /recipes
router.get('/', recipesCtrl.index);
// GET/recipes/new <-- Define BEFORE show route
router.get('/new', recipesCtrl.new);
// GET /recipes/:id
// router.get('/:id', recipesCtrl.show);
// POST /recipes
router.post('/', recipesCtrl.create);
// DELETE /recipes/:id
router.delete('/:id', recipesCtrl.delete)

module.exports = router;
