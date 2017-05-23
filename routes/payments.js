const co = require('co');

exports.showAdd = function(req, res, next) {
    co(function*() {
        try {
            var user = req.session.user;
            const services = yield req.getServices();
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.show();
            res.render('addPayments', {
                teacher: result,
                user: user
            });
        } catch (err) {
            req.flash('alert', 'error occurred');
            res.redirect('/make-payment');
            next(err);
        };
    });
};

exports.show = function(req, res, next) {
    co(function*() {
        try {
            var admin = req.session.role === 'admin';
            var user = req.session.user;
            const services = yield req.getServices();
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.showPayments();
            res.render('payments', {
                result: result,
                admin: admin,
                user: user
            });
        } catch (err) {
            req.flash('alert', 'error occurred');
            res.redirect('/payments');
            next(err);
        };
    });
};

exports.addPayment = function(req, res, next) {
    co(function*() {
        try {
            var data = {
                month: req.body.month,
                payment_date: req.body.payment_date,
                amount: req.body.amount,
                teacher_id: req.body.teacher_id,
                status: 'received'
            };

            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.insert('payments', data);
            req.flash('success', 'Payment made');
            res.redirect('/payments');
        } catch (err) {
            req.flash('alert', 'Please check if values correct values were entered');
            res.redirect('/make-payment');
            next(err);
        };
    });
};

exports.edit = function(req, res, next) {
    co(function*() {
        try {
            var user = req.session.user;
            var id = req.params.id;
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.edit('payments', id);
            res.render('edit', {
                data: result,
                user: user
            });
        } catch (err) {
            req.flash('alert', 'Please check if values correct values were entered');
            res.redirect('/edit');
            next(err);
        };
    });
};

exports.update = function(req, res, next) {
    co(function*() {
        try {
            var id = req.params.id;
            var data = {
                month: req.body.month,
                payment_date: req.body.payment_date,
                amount: req.body.amount,
                teacher_id: req.body.teacher_id,
                status: req.body.status
            };
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.update('payments', data, id);
            req.flash('success', 'Update successful');
            res.redirect('/payments');
        } catch (err) {
            req.flash('alert', 'Please check if values correct values were entered');
            res.redirect('/make-payment');
            next(err);
        };
    });
};

exports.delete = function(req, res, next) {
    co(function*() {
        try {
            var id = req.params.id;
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.delete('payments', id);
            req.flash('success', 'Delete successful');
            res.redirect('/payments');
        } catch (err) {
            req.flash('alert', 'Error occurred on deleting item');
            res.redirect('/payments');
            next(err);
        };
    });
};

exports.addOtherPayment = function(req, res, next) {
    co(function*() {
        try {
            var data = {
                month: 'n/a',
                payment_date: req.body.payment_date,
                amount: req.body.amount,
                comments: req.body.comments
            };
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.insert('extras', data);
            req.flash('success', 'Payment made');
            res.redirect('/extras');
        } catch (err) {
            req.flash('alert', 'Error occurred on deleting item');
            res.redirect('/extras');
            next(err);
        };
    });
};

exports.showOtherPayments = function(req, res, next) {
    co(function*() {
        try {
            var user = req.session.user;
            var admin = req.session.role === 'admin';
            const services = yield req.getServices();
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.showOtherPayments();
            res.render('extras', {
                admin: admin,
                result: result,
                user: user
            });
        } catch (err) {
            req.flash('alert', 'Error occurred');
            res.redirect('/extras');
            next(err);
        };
    });
};

exports.editOtherPayment = function(req, res, next) {
    co(function*() {
        try {
            var user = req.session.user,
                admin = req.session.role === 'admin',
                id = req.params.id;
            const services = yield req.getServices();
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.editOtherPayment(id);
            res.render('edit-payment', {
                admin: admin,
                result: result,
                user: user
            });
        } catch (err) {
            req.flash('alert', 'Error occurred on updating item');
            res.redirect('/edit/payment/' + id);
            next(err);
        };
    });
};

exports.updateOtherPayment = function(req, res, next) {
    co(function*() {
        try {
            var id = req.params.id;
            var data = {
                payment_date: req.body.payment_date,
                amount: req.body.amount,
                comments: req.body.comments
            };
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.update('extras', data, id);
            req.flash('success', 'Update successful');
            res.redirect('/extras');
        } catch (err) {
            req.flash('alert', 'Please check if values correct values were entered');
            res.redirect('/edit/payment/' + id);
            next(err);
        };
    });
};

exports.deleteOtherPayment = function(req, res, next) {
    co(function*() {
        try {
            var id = req.params.id;
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.delete('extras', id);
            req.flash('success', 'Delete successful');
            res.redirect('/extras');
        } catch (err) {
            req.flash('alert', 'Error occurred on deleting item');
            res.redirect('/extras');
            next(err);
        };
    });
};
