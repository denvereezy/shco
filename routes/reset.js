const co = require('co'),
    encryptonator = require('encryptonator');

exports.reset = function(req, res, next) {
    co(function * () {
        try {
            var username = req.body.username,
                password = req.body.password,
                confirm = req.body.confirm;
            const services = yield req.getServices();
            const resetDataService = services.resetDataService;
            const userDataService = services.userDataService;
            const account = yield userDataService.checkUsername(username);
            if (!account.length) {
                req.flash('alert', 'Account not found');
                res.redirect('/password/reset');
            } else if (password !== confirm) {
                req.flash('alert', 'Passwords does not match');
                res.redirect('/password/reset');
            } else {
                var newPassword = yield encryptonator.encryptPassword(password);
                const result = yield resetDataService.update(newPassword, username);
                req.flash('success', 'Password reset');
                res.redirect('/');
            }
        } catch (err) {
            req.flash('alert', 'Error occurred');
            res.redirect('/password/reset');
            next(err);
        }
    });
};
