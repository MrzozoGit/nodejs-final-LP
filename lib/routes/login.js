'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                password: Joi.string().required().min(8).example('passwd123').description('Password of the user'),
                mail: Joi.string().required().min(8).example('johndoe@gmail.com').description('Mail of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.login(request.payload);
    }
};
