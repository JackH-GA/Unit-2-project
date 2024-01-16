const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All actual paths start with "/recipes"

// GET the update page 
router.get('/update/:id', ensureLoggedIn, recipesCtrl.getUpdatePage);
// UPDATE /update/:id
router.put('/update/:id', ensureLoggedIn, recipesCtrl.update);
// GET /recipes
router.get('/', recipesCtrl.index);
// GET/recipes/new <-- Define BEFORE show route
router.get('/new', ensureLoggedIn, recipesCtrl.new);
// POST /recipes
router.post('/', ensureLoggedIn, recipesCtrl.create);
// DELETE /recipes/:id
// router.delete('/:id', recipesCtrl.delete)
// GET /recipes/:id
router.get('/:id', recipesCtrl.show);

module.exports = router;
