exports.checkUser = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/");
    };
};

exports.login = function(req, res, next) {
    res.render('login', {
        layout: false
    });
};

exports.makePayment = function(req, res, next) {
    res.render('payments');
};

exports.home = function(req, res, next) {
    var user = req.session.user;
    var teacher = req.session.role === 'teacher';
    if (teacher) {
        res.render('index', {
            data: 'Welcome back ' + user + '!',
            layout: 'teachers'
        });
    } else {
        res.render('index', {
            data: 'Welcome back ' + user + '!'
        });
    };
};

exports.logout = function(req, res, next) {
    delete req.session.user
    res.redirect("/");
};
