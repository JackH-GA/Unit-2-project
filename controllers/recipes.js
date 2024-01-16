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
    const recipeId = '65a683657bc47df735615824';
    console.log('recieved id:', req.params.id);
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).send('Invalid Id Format');
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        };
        res.render('recipes/show', {recipe});
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

async function getUpdatePage(req, res) {
    console.log("Getting update page for recipe", req.params.id);
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId).populate('user');
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        // Optional: Check if the logged-in user is the same as the recipe's user
        if (req.user && recipe.user._id.equals(req.user._id)) {
            res.render('recipes/update', { recipe });
        } else {
            res.status(401).send('Unauthorized');
        }
    } 
    catch (error) {
        console.error("Error in getUpdatePage:", error);
        res.status(500).send('Server error');
    }
};

async function update(req, res) {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        // Check if the logged-in user is the same as the recipe's user
        if (!req.user || !recipe.user._id.equals(req.user._id)) {
            return res.status(401).send('Unauthorized');
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
        res.redirect(`/recipes/${updatedRecipe._id}`);
    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    index,
    getUpdatePage,
    update,
    show,
    new: newRecipe,
    create
    // delete: deleteRecipe
};