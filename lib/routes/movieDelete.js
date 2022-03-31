'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
    path: '/movie/delete/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().description('id of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return movieService.delete(request.params.id);
    }
};
