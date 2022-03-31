'use strict';

const Joi = require('joi');
const IutEncrypt = require('@mrzozo/iut-encrypt');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            username: Joi.string().min(3).description('Username of the user'),
            password: Joi.string().min(8).description('Password of the user'),
            mail: Joi.string().min(8).description('Mail of the user'),
            role: Joi.string().description('Role of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get jsonAttributes() {
        
        return ['scope']
    }

    $beforeInsert(queryContext) {

        this.createdAt = new Date();
        this.role = 'user';

        // Encodage en sha1, commenté pour garder le mot de passe tel quel afin de s'authentifier sur Ethereal pour tester l'envoie d'email
        // this.password = IutEncrypt.sha1(this.password);
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();

        // Encodage en sha1, commenté pour garder le mot de passe tel quel afin de s'authentifier sur Ethereal pour tester l'envoie d'email
        // if(this.password) this.password = IutEncrypt.sha1(this.password);
    }

};
