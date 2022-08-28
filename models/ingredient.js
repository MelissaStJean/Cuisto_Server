module.exports =
class Ingredient{
    constructor(ingredientName, ingredientQuantity, ingredientCategory, ingredientMeasure, ingredientExpirationDate, imageGUID, userId){
        this.Id = 0;
        this.IngredientName = ingredientName !== undefined ? ingredientName : "";
        this.IngredientQuantity = ingredientQuantity !== undefined ? ingredientQuantity : "";
        this.IngredientCategory = ingredientCategory !== undefined ? ingredientCategory : "";
        this.IngredientMeasure = ingredientMeasure !== undefined ? ingredientMeasure : "";
        this.IngredientExpirationDate = ingredientExpirationDate !== undefined ? ingredientExpirationDate : "";
        this.IngredientImageGUID = imageGUID !== undefined ? imageGUID : "";
        this.UserId = userId !== undefined ? userId : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('IngredientName','string');
        validator.addField('IngredientCategory','string');
        validator.addField('IngredientQuantity','float');
        validator.addField('IngredientMeasure','string');
        validator.addField('IngredientExpirationDate','string');
        validator.addField('UserId','integer');
        return validator.test(instance);
    }
}