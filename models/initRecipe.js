const Category = require('./category.js');

exports.initRecipe = function (){
    const RecipeRepository = require('./Repository.js');
    const CategoryRepository = require('./Repository.js');
    const IngredientRepository = require('./repository.js');
    const Recipe = require('./Recipe');
    const recipeRepository = new RecipeRepository("Recipes");
    const categoryRepository = new CategoryRepository("Categories");
    const ingredientRepository = new IngredientRepository("Ingredients");
    let ingredient = [];
    ingredient.push(ingredientRepository.get(1));
    ingredient.push(ingredientRepository.get(2));
    ingredient.push(ingredientRepository.get(3));

    let steps = [];
    steps.push("Exemple pour");
    steps.push("le futur");
    steps.push("ok boomer");
    recipeRepository.add(new Recipe("Pancake", categoryRepository.get(1), ingredient, steps,4,2,5,15,30,350,"Bien beurrer","Farine de sarasin","N/A"));
    // Ajoute moé les caliss de recettes :)
}