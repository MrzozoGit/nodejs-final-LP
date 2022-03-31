'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {

        return 'favorite';
    }

    static get joiSchema() {

        return Joi.object({
            idUser: Joi.number().required().integer().greater(0),
            idMovie: Joi.number().required().integer().greater(0)
        });
    }
};
