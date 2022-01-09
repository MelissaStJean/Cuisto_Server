module.exports =
class Filter{
    constructor(filterName){
        this.Id = 0;
        this.FilterName = filterName !== undefined ? filterName : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('FilterName','string');
        return validator.test(instance);
    }
}