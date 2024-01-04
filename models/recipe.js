const recipes = [
    {id: 125223, recipe: 'Chicken Marsala'},
    {id: 127904, recipe: 'Chicken Curry'},
    {id: 139608, recipe: 'Country Mashed Potatoes'}
];

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne
  };
  
  function deleteOne(id) {
    id = parseInt(id);
    // Find the index for the todo
    const idx = recipes.findIndex(recipe => recipe.id === id);
    recipes.splice(idx, 1);
  }
  
  function create(recipe) {
    // Add the id
    recipe.id = Date.now() % 1000000;
    recipes.push(recipe);
  }
  
  function getOne(id) {
    id = parseInt(id);
    return recipes.find(recipe => recipe.id === id);
  }
  
  function getAll() {
    return recipes;
  }