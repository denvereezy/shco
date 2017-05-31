const nodemailer = require('nodemailer'),
    Promise = require('bluebird');

module.exports = function() {
    var smtpConfig = {
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.password
        }
    };

    var poolConfig = {
        pool: true,
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.password
        }
    };

    var directConfig = {
        name: 'shco.com'
    };

    this.sendPasswordReset = function(data) {

        var transporter = nodemailer.createTransport(smtpConfig, poolConfig, directConfig);
        var mailOptions = {
            from: '"SHCO" <noreply@shco.com>',
            to: [data.email],
            subject: 'Password reset',
            text: 'Please follow the link to reset your password. ' + process.env.link + data.token
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                return error;
            } else {
                console.log('Message sent: ' + info.response);
                return 'Message sent: ' + info.response;
            };
        });
    };
};
