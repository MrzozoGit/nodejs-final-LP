'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/movie/edit/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Joi.string().required().min(1).example('The Lord of the Rings: The Fellowship of the Ring').description('Title of the movie'),
                description: Joi.string().required().min(1).example('The Lord of the Rings: The Fellowship of the Ring is a 2001 epic fantasy adventure film directed by Peter Jackson, based on the 1954 novel The Fellowship of the Ring, the first volume of J. R. R. Tolkien\'s The Lord of the Rings.').description('Description of the user'),
                releaseDate: Joi.date().required().example('12-19-2001').description('Release date of the movie'),
                director: Joi.string().required().example('Peter Jackson').min(2).description('Password of the user')
            }),
            params: Joi.object({
                id: Joi.number().required().description('Id of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();
        const { emailService } = request.services();

        return await movieService.update(request.params.id, request.payload, emailService);
    }
};
