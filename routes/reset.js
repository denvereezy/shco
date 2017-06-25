const co = require('co'),
    uuid = require('node-uuid');

exports.reset = function(req, res, next) {
    co(function * () {
        try {
            var username = req.body.username,
                email    = req.body.email;

            const services         = yield req.getServices();
            const resetDataService = services.resetDataService;
            const userDataService  = services.userDataService;
            const transporter      = services.smtpDataService;
            const account          = yield userDataService.checkUsername(username);

            if (!account.length) {
                req.flash('alert', 'Account not found');
                res.redirect('/password/reset');
            } else {
                var data = {
                    email: email,
                    token: uuid.v4()
                };
                 transporter.sendPasswordReset(data);
                req.flash('success', `Email send to ${email} with reset link`);
                res.redirect('/');
            }
        } catch (err) {
            req.flash('alert', 'Error occurred');
            res.redirect('/password/reset');
            next(err);
        }
    });
};

exports.updateUserAccount = function(req, res, next) {
    co(function * () {
        try {
            const services        = yield req.getServices();
            const userDataService = services.userDataService;

            var token     = req.params.token;
            var password  = req.body.password;
            var password2 = req.body.password2;

            if (password !== password2) {
                req.flash('alert', 'Passwords does not match. Please try again');
                return res.redirect('/reset/' + token);
            } else {
                yield userDataService.updatePassword(password, token);
                return res.redirect('/');
            }
        } catch (err) {
            req.flash('alert', 'Error occurred');
            res.redirect('/reset/' + token);
            next(err);
        };
    });

};
