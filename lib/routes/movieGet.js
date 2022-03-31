'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/movie/get/{id}',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().description('id of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { Movie } = request.models();
        const movies = await Movie.query().select('id', 'title', 'description', 'director', 'releaseDate', 'createdAt', 'updatedAt').where('id', request.params.id).from('movie');
        return movies;
    }
};
