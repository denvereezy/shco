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
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.create(data);
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
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.edit(id);
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
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.update(data, id);
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
            const paymentDataService = services.paymentDataService;
            const result = yield paymentDataService.delete(id);
            req.flash('success', 'Delete successful');
            res.redirect('/payments');
        } catch (err) {
            req.flash('alert', 'Error occurred on deleting item');
            res.redirect('/payments');
            next(err);
        };
    });
};
