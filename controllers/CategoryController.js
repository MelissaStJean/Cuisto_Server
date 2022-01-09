const Repository = require('../models/repository');
const Category = require('../models/category');

module.exports =
    class CategoryController extends require('./Controller') {
        constructor(req, res, params) {
            super(req, res, params, false /* needAuthorization */);
            this.categoriesRepository = new Repository('Categories', true /* cached */);
        }

        head() {
            console.log("Categories ETag request:", this.categoriesRepository.ETag);
            this.response.ETag(this.categoriesRepository.ETag);
        }

        // GET: api/categories
        // GET: api/categories?sort=key&key=value....
        // GET: api/categories/{id}
        get(id) {
            if (this.params) {
                if (Object.keys(this.params).length > 0) {
                    this.response.JSON(this.categoriesRepository.getAll(this.params), this.categoriesRepository.ETag);
                } else {
                    this.queryStringHelp();
                }
            }
            else {
                if (!isNaN(id)) {
                    this.response.JSON(this.categoriesRepository.get(id));
                }
                else {
                    this.response.JSON(this.categoriesRepository.getAll(), this.categoriesRepository.ETag);
                }
            }
        }
        post(category) {
            if (this.requestActionAuthorized()) {
                // validate category before insertion
                if (Category.valid(category)) {
                    // avoid duplicate names
                    if (this.categoriesRepository.findByField('CategoryName', category.CategoryName) !== null) {
                        this.response.conflict();
                    } else {
                        let newCategory = this.categoriesRepository.add(category);
                        if (newCategory)
                            this.response.created(newCategory);
                        else
                            this.response.internalError();
                    }
                } else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        // PUT: api/categories body payload[{"CategoryId":..., "CategoryName": "..."}]
        put(category) {
            if (this.requestActionAuthorized()) {
                // validate category before updating
                if (Category.valid(category)) {
                    let foundCategory = this.categoriesRepository.findByField('CategoryName', category.CategoryName);
                    if (foundCategory != null) {
                        if (foundCategory.CategoryId != category.CategoryId) {
                            this.response.conflict();
                            return;
                        }
                    }
                    if (this.categoriesRepository.update(category))
                        this.response.ok();
                    else
                        this.response.notFound();
                } else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        // DELETE: api/categories/{id}
        remove(id) {
            if (this.requestActionAuthorized()) {
                if (this.categoriesRepository.remove(id))
                    this.response.accepted();
                else
                    this.response.notFound();
            } else
                this.response.unAuthorized();
        }
    }