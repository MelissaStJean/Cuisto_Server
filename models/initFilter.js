exports.initFilter = function (){
    const FilterRepository = require('./Repository.js');
    const Filter = require('./Filter');
    const filterRepository = new FilterRepository("Filters");
    filterRepository.add(new Filter("Santé"));
    filterRepository.add(new Filter("Sans-Gluten"));
    filterRepository.add(new Filter("Vegan"));
    filterRepository.add(new Filter("Protéiné"));
    // Ajoute moé les caliss de filtres :)
}