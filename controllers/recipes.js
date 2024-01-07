const Recipe = require('../models/recipe');


function deleteRecipe(req, res) {
    Recipe.deleteOne(req.params.id);
    res.redirect('/recipes');
}

async function create(req, res) {
    console.log(req.body);
    // Models are responsible for CRUD'ing the data

    try {
    await Recipe.create(req.body);
    // Always do a redirect when data has been changed
    res.redirect('/recipes');
    } catch (err) {
        console.log('an error occured: \n', err)

        // res.render('movies/new', { errorMsg Recipe.exists.messege })
    }
}

async function newRecipe(req, res) {
    res.render('recipes/new', { errorMsg: ''})
}

function show(req, res) {
    res.render('recipes/show', {
        recipe: Recipe.getOne(req.params.id),
      title: 'Recipe Details'
    });
}

async function index(req, res) {
    if (req.body.ingredients) { req.body.ingredients = req.body.ingredients.split(/\s*,\s*/)}
    if (req.body.steps) { req.body.steps = req.body.steps.split(/\s*,\s*/)}

    try {
        const allRecipes = await Recipe.find({})
    
        res.render('recipes/index', { recipes: allRecipes })
    } catch (err) {
        console.log('an error occured: \n', err)

        res.render('error', { error: err })
    }
}

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    delete: deleteRecipe
};