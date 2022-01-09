module.exports =
class Category{
    constructor(categoryName){
        this.Id = 0;
        this.CategoryName = categoryName !== undefined ? categoryName : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('CategoryName','string');
        return validator.test(instance);
    }
}