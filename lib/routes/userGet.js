'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().description('id of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { User } = request.models();

        const user = await User.query().select('id', 'firstname', 'lastname', 'username', 'password', 'mail').where('id', request.params.id).from('user');
        return user;
    }
};
