'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {

            table.integer('idUser').notNull();
            table.integer('idMovie').notNull();

            table.foreign('idUser').references('user.id');
            table.foreign('idMovie').references('movie.id');
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    },

    async get(knex) {

        await knex.select('idUser', 'idMovie').from('favorite');
    }
};
