'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().required().min(1).example('The Lord of the Rings: The Fellowship of the Ring').description('Title of the movie'),
            description: Joi.string().required().min(1).example('The Lord of the Rings: The Fellowship of the Ring is a 2001 epic fantasy adventure film directed by Peter Jackson, based on the 1954 novel The Fellowship of the Ring, the first volume of J. R. R. Tolkien\'s The Lord of the Rings.').description('Description of the user'),
            releaseDate: Joi.date().required().example('12-19-2001').description('Release date of the movie'),
            director: Joi.string().required().min(2).example('Peter Jackson').description('Password of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
