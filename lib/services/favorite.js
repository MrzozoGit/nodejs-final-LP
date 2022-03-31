'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const JWT = require('@hapi/jwt');

module.exports = class FavoriteService extends Service {

    async create(idUser, idMovie) {

        const { Favorite } = this.server.models();

        const alreadyExists = await Favorite.query().select('idUser', 'idMovie').from('favorite').where('idUser', idUser).andWhere('idMovie', idMovie);
        if(alreadyExists.length == 0) {
            const query = Favorite.query().insert({idUser: idUser, idMovie: idMovie});
            return query;
        } else {
            throw Boom.badRequest('this movie is already in your favorites');
        }
    }

    async delete(idUser, idMovie) {

        const { Favorite } = this.server.models();

        try {
            await Favorite.query()
                .delete()
                .where('idUser', idUser)
                .andWhere('idMovie', idMovie)
                .throwIfNotFound();
            return '';
        }
        catch(err) {
            throw new Boom.notFound('this movie isn\'t in your favorites');
        }
    }
};
