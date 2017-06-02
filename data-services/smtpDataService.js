const nodemailer = require('nodemailer'),
    Promise = require('bluebird');

module.exports = function() {
    var smtpConfig = {
        service: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    };

    this.sendPasswordReset = function(data) {

        var transporter = nodemailer.createTransport('SMTP', smtpConfig);

        var mailOptions = {
            from: '"SHCO" <noreply@shco.com>',
            to: data.email,
            subject: 'Password reset',
            text: `Please follow the link to reset your password. ${process.env.link}${data.token}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error: ', error);
                return error;
            } else {
                console.log('Message sent: ' + info.message);
                return 'Message sent: ' + info.message;
            };
        });
    };
};
