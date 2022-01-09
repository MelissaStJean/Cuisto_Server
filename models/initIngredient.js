exports.initIngredient = function (){
    const FilterRepository = require('./Repository.js');
    const Ingredient = require('./ingredient');
    const ingredientRepository = new FilterRepository("Ingredients");
    ingredientRepository.add(new Ingredient("Farine",1,"03/03/02",));
    ingredientRepository.add(new Ingredient("Chocolat",2,"05/10/23"));
    ingredientRepository.add(new Ingredient("Framboise",3,"18/01/22"));
    ingredientRepository.add(new Ingredient("Sucre",1,"07/07/25"));
    // Ajoute moé les caliss d'ingrédients :)
}