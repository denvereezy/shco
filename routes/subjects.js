const co = require('co');

exports.add = function(req, res, next) {
    co(function * () {
        try {
            var subject = req.body.subject;
            const services = yield req.getServices();
            const subjectDataService = services.subjectDataService;
            const result = yield subjectDataService.add(subject);
            req.flash('success', 'subject added');
            res.redrect('/subjects');
        } catch (err) {
            req.flash('error', 'error');
            res.redirect('/subjects');
            next(err);
        }
    });
};

exports.show = function(req, res, next) {
    co(function * () {
        try {
            var user = req.session.user;
            const services = yield req.getServices();
            const subjectDataService = services.subjectDataService;
            const result = yield subjectDataService.show();
            res.render('subjects', {
                layout: 'teachers',
                subject: result,
                user: user
            });
        } catch (err) {
            req.flash('error', 'error');
            res.redirect('/subjects');
            next(err);
        }
    });
};

exports.edit = function(req, res, next) {
    co(function * () {
        try {
            var user = req.session.user;
            var id = req.params.id;
            const services = yield req.getServices();
            const subjectDataService = services.subjectDataService;
            const subject = yield subjectDataService.edit(id);
            res.render('edit-subject', {
                user: user,
                layout: 'teachers',
                subject: subject
            });
        } catch (err) {
            req.flash('error', 'error');
            res.redirect('/subjects');
            next(err);
        }
    });
};

exports.update = function(req, res, next) {
    co(function * () {
        try {
            var id = req.params.id;
            var data = {
                subject: req.body.subject
            };
            const services = yield req.getServices();
            const subjectDataService = services.subjectDataService;
            const result = yield subjectDataService.update(data, id);
            res.redirect('/subjects');
        } catch (err) {
            req.flash('error', 'error');
            res.redirect('/subject/update/' + id);
            next(err);
        }
    });
};
