const co = require('co'),
    encryptonator = require('encryptonator');

exports.profile = function(req, res, next) {
    co(function*() {
        try {
            var user_id = req.session.user_id;
            var role = req.session.role;
            var layout;
            switch (role) {
                case 'admin':
                    layout = 'main';
                    break;
                case 'teacher':
                    layout = 'teachers';
                    break;
            };
            const services = yield req.getServices();
            const userDataService = services.userDataService;
            const result = yield userDataService.profile(user_id);
            res.render('profile', {
                data: result,
                layout: layout
            });
        } catch (err) {
            req.flash('alert', 'Error occurred');
            res.redirect('/profile');
            next(err);
        };
    });
};

exports.update = function(req, res, next) {
    co(function*() {
        try {
            var user_id = req.session.user_id;
            var password = req.body.password;
            var hash = yield encryptonator.encryptPassword(password);
            const services = yield req.getServices();
            const userDataService = services.userDataService;
            const result = yield userDataService.update(hash, user_id);
            res.redirect('/home');
        } catch (err) {
            req.flash('alert', 'Error occurred on updating profile');
            res.redirect('/profile');
            next(err);
        };
    });
};
