const Recipe = require('../models/recipe');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    delete: deleteRecipe
};

function deleteRecipe(req, res) {
    Recipe.deleteOne(req.params.id);
    res.redirect('/recipes');
  }
  
  function create(req, res) {
    console.log(req.body);
    // Models are responsible for CRUD'ing the data
    Recipe.create(req.body);
    // Always do a redirect when data has been changed
    res.redirect('/recipes');
  }
  
  function newRecipe(req, res) {
    res.render('recipes/new', { title: 'New Recipe'})
  }
  
  function show(req, res) {
    res.render('recipes/show', {
      recipe: Recipe.getOne(req.params.id),
      title: 'Recipe Details'
    });
  }
  
  function index(req, res) {
    res.render('recipes/index', {
      recipes: Recipe.getAll(),
      title: 'All Recipes'
    });
  }