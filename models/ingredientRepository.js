const Repository = require('./repository');
const ImageFilesRepository = require('./imageFilesRepository.js');
const Ingredient = require('./ingredient.js');
const utilities = require("../utilities");
module.exports = 
class IngredientRepository extends Repository {
    constructor(req){
        super('Ingredients', true);
        this.req = req;
    }
    bindIngredientURL(ingredient){
        if (ingredient) {
            let bindedIngredient = {...ingredient};
            if (ingredient["IngredientImageGUID"] != ""){
                bindedIngredient["IngredientImageGUID"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getImageFileURL(ingredient["IngredientImageGUID"]);
            } else {
                bindedIngredient["IngredientImageGUID"] = "";
            }
            return bindedIngredient;
        }
        return null;
    }
    bindIngredientURLS(ingredients){
        let bindedIngredient = [];
        for(let ingredient of ingredients) {
            bindedIngredient.push(this.bindIngredientURL(ingredient));
        };
        return bindedIngredient;
    }
    get(id) {
        return this.bindIngredientURL(super.get(id));
    }
    getAll() {
        return this.bindIngredientURLS(super.getAll());
    }
    add(ingredient) {
        if (Ingredient.valid(ingredient)) {
            ingredient["IngredientImageGUID"] = ImageFilesRepository.storeImageData("", ingredient["IngredientData"]);
            delete ingredient["IngredientData"];
            return this.bindIngredientURL(super.add(ingredient));
        }
        return null;
    }
    update(ingredient) {
        if (Ingredient.valid(ingredient)) {
            let foundIngredient = super.get(ingredient.Id);
            if (foundIngredient != null) {
                ingredient["IngredientImageGUID"] = ImageFilesRepository.storeImageData(ingredient["IngredientImageGUID"], ingredient["IngredientData"]);
                delete ingredient["IngredientData"];
                
                return super.update(ingredient);
            }
        }
        return false;
    }
    remove(id){
        let foundIngredient = super.get(id);
        if (foundIngredient) {
            ImageFilesRepository.removeImageFile(foundIngredient["IngredientImageGUID"]);
            return super.remove(id);
        }
        return false;
    }
}