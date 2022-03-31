'use strict';

module.exports = {
    method: 'get',
    path: '/favorite/get-all',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { Favorite } = request.models();
        
        const favorites = await Favorite.query().select('idUser', 'idMovie').from('favorite');

        return favorites;
    }
};
