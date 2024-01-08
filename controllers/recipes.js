const mongoose = require('mongoose')
const Recipe = require('../models/recipe');


// function deleteRecipe(req, res) {
//     Recipe.deleteOne(req.params.id);
//     res.redirect('/recipes');
// }

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

async function show(req, res) {
    const recipeId = req.params.id
    console.log('recieved id:', req.params.id)
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).send('Invalid Id Format');
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipes/:id', {recipe});
        } catch (err) {
        console.error(err);

        res.status(500).send('Server Error');
    }

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
    // delete: deleteRecipe
};