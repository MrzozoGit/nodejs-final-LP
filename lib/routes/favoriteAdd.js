'use strict';

const Joi = require('joi');
const JWT = require('@hapi/jwt');

module.exports = {
    method: 'post',
    path: '/favorite/add',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                idMovie: Joi.number().required().example(1).description('Id of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();
        
        const idUser = JWT.token.decode((request.headers['authorization'].split(' '))[1]).decoded.payload.id;

        return await favoriteService.create(idUser, request.payload.idMovie);
    }
};
