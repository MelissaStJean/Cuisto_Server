const Repository = require('../models/repository');
const Filter = require('../models/filter');

module.exports =
    class FilterController extends require('./Controller') {
        constructor(req, res, params) {
            super(req, res, params, false /* needAuthorization */);
            this.filtersRepository = new Repository('Filters', true /* cached */);
        }

        head() {
            console.log("Filters ETag request:", this.filtersRepository.ETag);
            this.response.ETag(this.filtersRepository.ETag);
        }

        // GET: api/filters
        // GET: api/filters?sort=key&key=value....
        // GET: api/filters/{id}
        get(id) {
            if (this.params) {
                if (Object.keys(this.params).length > 0) {
                    this.response.JSON(this.filtersRepository.getAll(this.params), this.filtersRepository.ETag);
                } else {
                    this.queryStringHelp();
                }
            }
            else {
                if (!isNaN(id)) {
                    this.response.JSON(this.filtersRepository.get(id));
                }
                else {
                    this.response.JSON(this.filtersRepository.getAll(), this.filtersRepository.ETag);
                }
            }
        }
        post(filter) {
            if (this.requestActionAuthorized()) {
                // validate filter before insertion
                if (Filter.valid(filter)) {
                    // avoid duplicate names
                    if (this.filtersRepository.findByField('FilterName', filter.FilterName) !== null) {
                        this.response.conflict();
                    } else {
                        let newFilter = this.filtersRepository.add(filter);
                        if (newFilter)
                            this.response.created(newFilter);
                        else
                            this.response.internalError();
                    }
                } else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        // PUT: api/filters body payload[{"FilterId":..., "FilterName": "..."}]
        put(filter) {
            if (this.requestActionAuthorized()) {
                // validate filter before updating
                if (Filter.valid(filter)) {
                    let foundFilter = this.filtersRepository.findByField('FilterName', filter.FilterName);
                    if (foundFilter != null) {
                        if (foundFilter.FilterId != filter.FilterId) {
                            this.response.conflict();
                            return;
                        }
                    }
                    if (this.filtersRepository.update(filter))
                        this.response.ok();
                    else
                        this.response.notFound();
                } else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        // DELETE: api/filters/{id}
        remove(id) {
            if (this.requestActionAuthorized()) {
                if (this.filtersRepository.remove(id))
                    this.response.accepted();
                else
                    this.response.notFound();
            } else
                this.response.unAuthorized();
        }
    }