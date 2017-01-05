const co = require('co');

exports.receivedPayments = function(req, res, next) {
    co(function*() {
        try {
            var identifier = req.session.identifier;
            var user = req.session.user;
            const services = yield req.getServices();
            const teacherDataService = services.teacherDataService;
            const receivedPayments = yield teacherDataService.receivedPayments(identifier);

            res.render('receivedPayments', {
                result: receivedPayments,
                user: user,
                layout: 'teachers'
            });
        } catch (err) {
            req.flash('alert', 'Error occurred');
            res.redirect('/received-payments');
            next(err);
        };
    });
};

exports.acceptPayment = function(req, res, next) {
    co(function*() {
        try {
            var id = req.params.id,
                status = 'confirmed';
            const services = yield req.getServices();
            const teacherDataService = services.teacherDataService;
            const confirmPayment = yield teacherDataService.acceptPayment(status, id);
            req.flash('success', 'Payment confirmed');
            res.redirect('/received-payments');
        } catch (err) {
            req.flash('alert', 'Error occurred on accepting payment');
            res.redirect('/received-payments');
            next(err);
        };
    });
};
