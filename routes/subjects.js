const co = require('co');

exports.add = function(req, res, next) {
    co(function * () {
        try {
            var subject = req.body.subject;
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.add('subjects', subject);
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
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.select('subjects');
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
            const generalDataService = services.generalDataService;
            const subject = yield generalDataService.edit('subjects', id);
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
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.update('subjects', data, id);
            res.redirect('/subjects');
        } catch (err) {
            req.flash('error', 'error');
            res.redirect('/subject/update/' + id);
            next(err);
        }
    });
};
