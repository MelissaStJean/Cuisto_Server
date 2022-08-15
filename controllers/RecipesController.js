const Repository = require('../models/repository');
const Recipe = require('../models/Recipe');

module.exports =
    class RecipeController extends require('./Controller') {
        constructor(req, res, params) {
            super(req, res, params, false /* needAuthorization */);
            this.recipesRepository = new Repository('Recipes', true /* cached */);
        }

        head() {
            console.log("Recipes ETag request:", this.recipesRepository.ETag);
            this.response.ETag(this.recipesRepository.ETag);
        }

        // GET: api/recipes
        // GET: api/recipes?sort=key&key=value....
        // GET: api/recipes/{id}
        get(id) {
            if (this.params) {
                if (Object.keys(this.params).length > 0) {
                    this.response.JSON(this.recipesRepository.getAll(this.params), this.recipesRepository.ETag);
                } else {
                    this.queryStringHelp();
                }
            }
            else {
                if (!isNaN(id)) {
                    this.response.JSON(this.recipesRepository.get(id));
                }
                else {
                    this.response.JSON(this.recipesRepository.getAll(), this.recipesRepository.ETag);
                }
            }
        }
        post(recipe) {
            if (this.requestActionAuthorized()) {
                // validate recipe before insertion
                if (Recipe.valid(recipe)) {
                    // avoid duplicate names
                    if (this.recipesRepository.findByField('RecipeName', recipe.RecipeName) !== null) {
                        this.response.conflict();
                    } else {
                        let newRecipe = this.recipesRepository.add(recipe);
                        if (newRecipe)
                            this.response.created(newRecipe);
                        else
                            this.response.internalError();
                    }
                } else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        // PUT: api/recipes body payload[{"RecipeId":..., "RecipeName": "...", "RecipeCategory": "...", "RecipeIngredient": "...", "RecipeImageGUID": ..}]
        put(recipe) {
            if (this.requestActionAuthorized()) {
                // validate recipe before updating
                if (Recipe.valid(recipe)) {
                    let foundRecipe = this.recipesRepository.findByField('RecipeName', recipe.RecipeName);
                    if (foundRecipe != null) {
                        if (foundRecipe.RecipeId != recipe.RecipeId) {
                            this.response.conflict();
                            return;
                        }
                    }
                    if (this.recipesRepository.update(recipe))
                        this.response.ok();
                    else
                        this.response.notFound();
                } else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        // DELETE: api/recipes/{id}
        remove(id) {
            if (this.requestActionAuthorized()) {
                if (this.recipesRepository.remove(id))
                    this.response.accepted();
                else
                    this.response.notFound();
            } else
                this.response.unAuthorized();
        }
    }