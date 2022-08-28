const Repository = require('../models/repository');
const Ingredient = require('../models/Ingredient');

module.exports =
    class IngredientController extends require('./Controller') {
        constructor(req, res, params) {
            super(req, res, params, false /* needAuthorization */);
            this.ingredientsRepository = new Repository('Ingredients', true /* cached */);
        }

        head() {
            console.log("Ingredients ETag request:", this.ingredientsRepository.ETag);
            this.response.ETag(this.ingredientsRepository.ETag);
        }

        // GET: api/ingredients
        // GET: api/ingredients?sort=key&key=value....
        // GET: api/ingredients/{id}
        get(id) {
            if (this.params) {
                if (Object.keys(this.params).length > 0) {
                    this.response.JSON(this.ingredientsRepository.getAll(this.params), this.ingredientsRepository.ETag);
                } else {
                    this.queryStringHelp();
                }
            }
            else {
                if (!isNaN(id)) {
                    this.response.JSON(this.ingredientsRepository.get(id));
                }
                else {
                    this.response.JSON(this.ingredientsRepository.getAll(), this.ingredientsRepository.ETag);
                }
            }
        }
        post(ingredient) {
            //if (this.requestActionAuthorized()) {
                // validate ingredient before insertion
                if (Ingredient.valid(ingredient)) {
                    // avoid duplicate names
                    if (this.ingredientsRepository.findByField('IngredientName', ingredient.IngredientName) !== null) {
                        this.response.conflict();
                    } else {
                        let newIngredient = this.ingredientsRepository.add(ingredient);
                        if (newIngredient)
                            this.response.created(newIngredient);
                        else
                            this.response.internalError();
                    }
                } else
                    this.response.unprocessable();
            //} else
                //this.response.unAuthorized();
        }
        // PUT: api/ingredients body payload[{"IngredientId":..., "IngredientName": "...", "IngredientQuantity": "...", "IngredientExpirationDate": "...", "IngredientImageGUID": ..}]
        put(ingredient) {
            if (this.requestActionAuthorized()) {
                // validate ingredient before updating
                if (Ingredient.valid(ingredient)) {
                    let foundIngredient = this.ingredientsRepository.findByField('IngredientName', ingredient.IngredientName);
                    if (foundIngredient != null) {
                        if (foundIngredient.IngredientId != ingredient.IngredientId) {
                            this.response.conflict();
                            return;
                        }
                    }
                    if (this.ingredientsRepository.update(ingredient))
                        this.response.ok();
                    else
                        this.response.notFound();
                } else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        // DELETE: api/ingredients/{id}
        remove(id) {
            if (this.requestActionAuthorized()) {
                if (this.ingredientsRepository.remove(id))
                    this.response.accepted();
                else
                    this.response.notFound();
            } else
                this.response.unAuthorized();
        }
    }