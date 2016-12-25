const co = require('co');
const encryptonator = require('encryptonator');

exports.login = function(req, res, next) {
    co(function*() {
        try {
            const data = {
                username: req.body.username,
                password: req.body.password
            };
            const services = yield req.getServices();
            const loginDataService = services.loginDataService;
            const user = yield loginDataService.login(data.username);
            if (user[0] === undefined) {
                req.flash('alert', 'username or password invalid');
                return res.redirect('/');
            } else {
                const match = yield encryptonator.comparePassword(data.password, user[0].password);
                if (match) {
                    req.session.user = user[0].username;
                    req.session.user_id = user[0].id;
                    req.session.role = user[0].role;
                    req.session.identifier = user[0].identifier;
                    res.redirect('/home');
                } else {
                    req.flash('alert', 'username or password invalid');
                    res.redirect('/');
                };
            }
        } catch (err) {
            req.flash('alert', 'error occurred');
            res.redirect('/');
            next(err);
        };
    });
};
