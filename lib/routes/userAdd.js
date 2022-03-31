'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/user/add',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().required().min(3).example('JDoe').description('Username of the user'),
                password: Joi.string().required().min(8).example('passwd123').description('Password of the user'),
                mail: Joi.string().required().min(8).example('johndoe@gmail.com').description('Mail of the user'),
                role: Joi.string().required().min(3).default('user').description('Role of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        const { emailService } = request.services();

        return await userService.create(request.payload, emailService);
    }
};
