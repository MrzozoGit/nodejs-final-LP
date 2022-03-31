'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/user/edit/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().required().min(3).example('JDoe').description('Username of the user'),
                password: Joi.string().required().min(8).example('passwd123').description('Password of the user'),
                mail: Joi.string().required().min(8).example('johndoe@gmail.com').description('Mail of the user'),
                role: Joi.string().required().default('user').description('Role of the user')
            }),
            params: Joi.object({
                id: Joi.number().required().description('Id of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.update(request.params.id, request.payload);
    }
};
