'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('username').notNull();
            table.string('password').notNull();
            table.string('mail').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    },

    async get(knex) {

        await knex.select('firstname', 'lastname', 'username', 'password', 'mail').from('user');
    }
};
