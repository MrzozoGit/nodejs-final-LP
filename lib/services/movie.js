'use strict';

const { Service } = require('@hapipal/schmervice');
const { Avocat } = require('@hapipal/avocat');
const Boom = require('@hapi/boom');
const JWT = require('@hapi/jwt');

module.exports = class MovieService extends Service {

    async create(movie, emailService) {

        const { Movie } = this.server.models();
        const { userService } = this.server.services();

        const users = await userService.getAll();
        try {
            users.forEach(user => {
                emailService.newMovieNotification(user, movie);
            });
        } catch(err) {
            throw new Boom.badGateway('Error with email configuration.')
        }
        
        
        return Movie.query().insertAndFetch(movie);
    }

    async delete(id) {

        const { Movie } = this.server.models();

        try {
            await Movie.query()
                .deleteById(id)
                .throwIfNotFound();
            return '';
        }
        catch (err) {
            throw new Boom.notFound();
        }
    }

    async update(id, movie, emailService) {

        const { Movie } = this.server.models();
        const { Favorite } = this.server.models();

        const users = await Favorite.query().join('user', 'favorite.idUser', '=', 'user.id').select('user.firstName', 'user.lastName', 'user.username', 'user.password', 'user.mail');

        try {
            users.forEach(user => {
                emailService.newMovieNotification(user, movie);
            });
        } catch(err) {
            throw new Boom.badGateway('Error with email configuration.')
        }

        return Movie.query().patchAndFetchById(id, movie);
    }
};
