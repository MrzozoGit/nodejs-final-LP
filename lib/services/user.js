'use strict';

const { Service } = require('@hapipal/schmervice');
const { Avocat } = require('@hapipal/avocat');
const IutEncrypt = require('@mrzozo/iut-encrypt');
const Boom = require('@hapi/boom');
const JWT = require('@hapi/jwt');

module.exports = class UserService extends Service {

    async getAll() {

        const { User } = this.server.models();

        const users = await User.query().select('id', 'firstname', 'lastname', 'username', 'password', 'mail', 'role', 'createdAt', 'updatedAt').from('user');

        return users;
    }

    create(user, emailService) {

        const { User } = this.server.models();

        let result;
        if (result = User.query().insertAndFetch(user)) {
            try {
                emailService.send(user);
            } catch(err) {
                throw new Boom.badGateway('Error with email configuration.')
            }
            return result;
        }

        return;
    }

    async delete(id) {

        const { User } = this.server.models();

        try {
            await User.query()
                .deleteById(id)
                .throwIfNotFound();
            return '';
        }
        catch (err) {
            throw new Boom.notFound();
        }
    }

    async update(id, user) {

        const { User } = this.server.models();

        let updateUser = await User.query().patchAndFetchById(id, user);

        return updateUser;
    }

    async login(user) {

        const { User } = this.server.models();
        const password = user.password;

        // Encodage en sha1, commenté pour garder le mot de passe tel quel afin de s'authentifier sur Ethereal pour tester l'envoie d'email
        // const password = IutEncrypt.sha1(user.password);

        try {
            const id = await User.query().select('id').where('mail', user.mail).throwIfNotFound();

            if (id) {
                try {
                    const find = await User.query().select('username', 'mail', 'role').where('mail', user.mail).where('password', password).throwIfNotFound();

                    if (find.length !== 0) {
                        const token = JWT.token.generate(
                            {
                                aud: 'urn:audience:iut',
                                iss: 'urn:issuer:iut',
                                id: id[0].id,
                                username: find[0].username,
                                email: find[0].mail,
                                scope: find[0].role
                            },
                            {
                                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                                algorithm: 'HS512'
                            },
                            {
                                ttlSec: 14400 // 4 hours
                            }
                        );

                        return token;
                    }
                }
                catch (err) {
                    throw Boom.unauthorized('invalid password');
                }
            }
        }
        catch (err) {
            return err;
        }
    }

    async promote(id) {

        const { User } = this.server.models();

        let role = { role: "admin" };
        let promotedUser = await User.query()
            .patch(role)
            .findById(id);
        
        return promotedUser;
    }
};
