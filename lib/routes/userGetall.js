'use strict';

module.exports = {
    method: 'get',
    path: '/user/get-all',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const users = userService.getAll();
        
        return users;
    }
};
