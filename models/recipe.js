module.exports =
class Recipe{
    constructor(recipeName, categories, ingredients, steps, dishesNumber, difficulty, rating, preparationTime, time, temperature, hints, lastResort, recipeImage){
        this.Id = 0;
        this.RecipeName = recipeName !== undefined ? recipeName : "";
        this.RecipeCategory = categories !== undefined ? categories : "";
        this.RecipeIngredient = ingredients !== undefined ? ingredients : "";
        this.RecipeSteps = steps !== undefined ? steps : "";
        this.RecipeDishesNumber = dishesNumber !== undefined ? dishesNumber : "";
        this.RecipeDifficulty = difficulty !== undefined ? difficulty : "";
        this.RecipeRating = rating !== undefined ? rating : "";
        this.RecipePreparationTime = preparationTime !== undefined ? preparationTime : "";
        this.RecipeCookingTime = time !== undefined ? time : "";
        this.RecipeCookingTemperature = temperature !== undefined ? temperature : "";
        this.RecipeHints = hints !== undefined ? hints : "";
        this.RecipeLastResort = lastResort !== undefined ? lastResort : "";
        this.RecipeImageGUID = recipeImage !== undefined ? recipeImage : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('RecipeName','string');
        validator.addField('RecipeCategory','string');
        validator.addField('RecipeIngredient','string');
        validator.addField('RecipeSteps','string');
        validator.addField('RecipeDishesNumber','integer');
        validator.addField('RecipeDifficulty','float');
        validator.addField('RecipeRating','integer');
        validator.addField('RecipePreparationTime','float');
        validator.addField('RecipeCookingTime','integer');
        validator.addField('RecipeCookingTemperature','integer');
        validator.addField('RecipeHints','string');
        validator.addField('RecipeLastResort','string');
        return validator.test(instance);
    }
}