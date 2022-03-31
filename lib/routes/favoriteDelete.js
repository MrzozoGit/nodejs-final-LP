'use strict';

const Joi = require('joi');
const JWT = require('@hapi/jwt');

module.exports = {
    method: 'delete',
    path: '/favorite/delete/{idMovie}',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                idMovie: Joi.number().required().description('id of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        const idUser = JWT.token.decode((request.headers['authorization'].split(' '))[1]).decoded.payload.id;

        return favoriteService.delete(idUser, request.params.idMovie);
    }
};
