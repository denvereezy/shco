const co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        try {
            var user = req.session.user;
            const services = yield req.getServices();
            const studentDataService = services.studentDataService;
            const result = yield studentDataService.getStudents();
            res.render('students', {
                students: result,
                user: user,
                layout: 'teachers'
            });
        } catch (err) {
            next(err);
        }
    });
};

exports.addStudent = function(req, res, next) {
    co(function*() {
        try {
            var data = {
                name: req.body.name,
                surname: req.body.surname
            };
            const services = yield req.getServices();
            const studentDataService = services.studentDataService;
            const result = yield studentDataService.addStudent(data);
            res.redirect('/students');
        } catch (err) {
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    co(function*() {
        try {
            var id = req.params.id;
            const services = yield req.getServices();
            const studentDataService = services.studentDataService;
            const result = yield studentDataService.delete(id);
            res.redirect('/students');
        } catch (err) {
            next(err);
        }
    });
};
