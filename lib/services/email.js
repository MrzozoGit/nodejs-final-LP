'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

module.exports = class emailService extends Service {

    send(user) {

        let dotenvConfig = dotenv.config();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: user.mail,
                pass: user.password
            }
        });

        var message = {
            from: 'placeholder@gmail.com',
            to: user.mail,
            subject: "Welcome!",
            text: "Welcome to this website!",
            html: "<p>Welcome to this website!</p>"
        };

        return transporter.sendMail(message);
    }

    newMovieNotification(user, movie) {

        let dotenvConfig = dotenv.config();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: user.mail,
                pass: user.password
            }
        });

        var message = {
            from: 'placeholder@gmail.com',
            to: user.mail,
            subject: "New movie!",
            text: "The new movie is " + movie.title,
            html: "<p>The new movie is " + movie.title + "</p>"
        };

        return transporter.sendMail(message);
    }

    favoriteUpdatedNotification(user, movie) {

        let dotenvConfig = dotenv.config();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: user.mail,
                pass: user.password
            }
        });

        var message = {
            from: 'placeholder@gmail.com',
            to: user.mail,
            subject: movie.title + " updated!",
            text: "The movie " + movie.title + " was updated!",
            html: "<p>The movie " + movie.title + " was updated!</p>"
        };

        return transporter.sendMail(message);
    }
};
