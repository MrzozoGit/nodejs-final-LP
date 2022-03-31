'use strict';

const JWT = require('@hapi/jwt');

module.exports = {
    method: 'get',
    path: '/favorite/get-my-favorites',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { Favorite } = request.models();
        const idUser = JWT.token.decode((request.headers['authorization'].split(' '))[1]).decoded.payload.id;
        const favorites = await Favorite.query().join('movie', 'favorite.idMovie', '=', 'movie.id').select('movie.title', 'movie.description', 'movie.director', 'movie.releaseDate').where('favorite.idUser', idUser);
        return favorites;
    }
};
