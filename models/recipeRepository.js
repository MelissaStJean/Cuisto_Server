const Repository = require('./repository');
const ImageFilesRepository = require('./imageFilesRepository.js');
const Recipe = require('./recipe.js');
const utilities = require("../utilities");
module.exports = 
class RecipeRepository extends Repository {
    constructor(req){
        super('Recipes', true);
        this.req = req;
    }
    bindRecipeURL(recipe){
        if (recipe) {
            let bindedRecipe = {...recipe};
            if (recipe["RecipeImageGUID"] != ""){
                bindedRecipe["RecipeImageGUID"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getImageFileURL(recipe["RecipeImageGUID"]);
            } else {
                bindedRecipe["RecipeImageGUID"] = "";
            }
            return bindedRecipe;
        }
        return null;
    }
    bindRecipeURLS(recipes){
        let bindedRecipe = [];
        for(let recipe of recipes) {
            bindedRecipe.push(this.bindRecipeURL(recipe));
        };
        return bindedRecipe;
    }
    get(id) {
        return this.bindRecipeURL(super.get(id));
    }
    getAll() {
        return this.bindRecipeURLS(super.getAll());
    }
    add(recipe) {
        if (Recipe.valid(recipe)) {
            recipe["RecipeImageGUID"] = ImageFilesRepository.storeImageData("", recipe["RecipeData"]);
            delete ingredient["RecipeData"];
            return this.bindRecipeURL(super.add(recipe));
        }
        return null;
    }
    update(recipe) {
        if (Recipe.valid(recipe)) {
            let foundRecipe = super.get(recipe.Id);
            if (foundRecipe != null) {
                recipe["RecipeImageGUID"] = ImageFilesRepository.storeImageData(recipe["RecipeImageGUID"], recipe["RecipeData"]);
                delete recipe["RecipeData"];
                
                return super.update(recipe);
            }
        }
        return false;
    }
    remove(id){
        let foundRecipe = super.get(id);
        if (foundRecipe) {
            ImageFilesRepository.removeImageFile(foundRecipe["RecipeImageGUID"]);
            return super.remove(id);
        }
        return false;
    }
}