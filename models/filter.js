module.exports =
class Filter{
    constructor(filterName, filterTag){
        this.Id = 0;
        this.FilterName = filterName !== undefined ? filterName : "";
        this.FilterTag = filterTag !== undefined ? filterTag : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('FilterName','string');
        validator.addField('FilterTag','string');
        return validator.test(instance);
    }
}