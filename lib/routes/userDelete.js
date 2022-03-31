'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
    path: '/user/delete/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().description('id of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return userService.delete(request.params.id);
    }
};
