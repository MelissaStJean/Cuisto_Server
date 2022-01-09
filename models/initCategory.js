exports.initCategory = function (){
    const CategoryRepository = require('./Repository.js');
    const Category = require('./Category');
    const categoryRepository = new CategoryRepository("Categories");
    categoryRepository.add(new Category("Déjeuner"));
    categoryRepository.add(new Category("Souper"));
    categoryRepository.add(new Category("Entrée"));
    categoryRepository.add(new Category("Dessert"));
    // Ajoute moé les caliss de catégories :)
}