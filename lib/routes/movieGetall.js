'use strict';

module.exports = {
    method: 'get',
    path: '/movie/get-all',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { Movie } = request.models();
        const movies = await Movie.query().select('id', 'title', 'description', 'director', 'releaseDate', 'createdAt', 'updatedAt').from('movie');
        return movies;
    }
};
