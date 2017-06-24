exports.checkUser = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/");
    };
};

exports.login = function(req, res, next) {
    res.render('login', {layout: false});
};

exports.makePayment = function(req, res, next) {
    var user = req.session.user;
    res.render('payments', {user: user});
};

exports.home = function(req, res, next) {
    var user = req.session.user;
    var teacher = req.session.role === 'teacher';
    if (teacher) {
        res.render('index', {
            data: 'Welcome back ' + user + '!',
            user: user,
            layout: 'teachers'
        });
    } else {
        res.render('index', {
            data: 'Welcome back ' + user + '!',
            user: user
        });
    };
};

exports.add = function(req, res, next) {
    var user = req.session.user;
    res.render('addOtherPayment', {user: user});
};

exports.logout = function(req, res, next) {
    delete req.session.user
    res.redirect("/");
};

exports.reset = function(req, res, next) {
    res.render('forgotPassword', {layout: false});
};

exports.adminRoute = function(req, res, next) {
    var admin = req.session.role === 'admin';
    if (!admin) {
        res.redirect('/home');
    } else {
        next();
    }
};

exports.teacherRoute = function(req, res, next) {
    var teacher = req.session.role === 'teacher';
    if (!teacher) {
        res.redirect('/home');
    } else {
        next();
    }
};

exports.updatePassword = function(req, res, next) {
    res.render('resetPassword', {
        layout: false
    });
};
