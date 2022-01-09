module.exports =
class Ingredient{
    constructor(ingredientName, ingredientQuantity, ingredientExpirationDate, imageGUID){
        this.Id = 0;
        this.IngredientName = ingredientName !== undefined ? ingredientName : "";
        this.IngredientQuantity = ingredientQuantity !== undefined ? ingredientQuantity : "";
        this.IngredientExpirationDate = ingredientExpirationDate !== undefined ? ingredientExpirationDate : "";
        this.IngredientImageGUID = imageGUID !== undefined ? imageGUID : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('IngredientName','string');
        validator.addField('IngredientQuantity','float');
        validator.addField('IngredientExpirationDate','date');
        return validator.test(instance);
    }
}