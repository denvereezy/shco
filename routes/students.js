const co = require('co');

exports.show = function(req, res, next) {
    co(function * () {
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
            req.flash('alert', 'Error occured');
            next(err);
        }
    });
};

exports.addStudent = function(req, res, next) {
    co(function * () {
        try {
            var data = {
                name: req.body.name,
                surname: req.body.surname
            };
            const services = yield req.getServices();
            const studentDataService = services.studentDataService;
            const result = yield studentDataService.addStudent(data);
            req.flash('success', 'Student added');
            res.redirect('/students');
        } catch (err) {
            req.flash('alert', 'Student could not be added');
            res.redirect('/students');
            next(err);
        }
    });
};

exports.edit = function(req, res, next) {
    co(function * () {
        try {
            var id = req.params.id,
                user = req.session.user;

            const services = yield req.getServices();
            const studentDataService = services.studentDataService;
            const result = yield studentDataService.edit(id);
            res.render('edit-student', {
                student: result,
                layout: 'teachers',
                user: user
            });
        } catch (err) {
            req.flash('alert', 'Error occured');
            res.redirect('/students');
            next(err);
        }
    });
};

exports.update = function(req, res, next) {
    co(function * () {
        try {
            var id = req.params.id,
                data = {
                    name: req.body.name,
                    surname: req.body.surname
                };

            const services = yield req.getServices();
            const studentDataService = services.studentDataService;
            const result = yield studentDataService.update(data, id);
            req.flash('success', 'Student updated');
            res.redirect('/students');
        } catch (err) {
            req.flash('alert', 'Error occured on update');
            res.redirect('/student/update/' + id);
            next(err);
        }
    });
};
