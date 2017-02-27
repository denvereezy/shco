const co = require('co');

exports.takeAttendance = function(req, res, next) {
    co(function * () {
        try {
            var data = {
                student_id: req.body.student_id,
                lesson: req.body.lesson
            };
            const services = yield req.getServices();
            const attendanceDataService = services.attendanceDataService;
            const result = yield attendanceDataService.takeAttendance(data);
            res.redirect('attendance');
        } catch (err) {
            req.flash('alert', 'Error occurred');
            next(err);
        }
    });
};

exports.getAttendance = function(req, res, next) {
    co(function * () {
        try {
            var user = req.session.user;
            const services = yield req.getServices();
            const attendanceDataService = services.attendanceDataService;
            const studentDataService = services.studentDataService;
            const students = studentDataService.getStudents();
            const attendance = attendanceDataService.getAttendance();
            const result = yield[students,
                attendance];
            res.render('attendance', {
                students: result[0],
                attendance: result[1],
                user: user,
                layout: 'teachers'
            });
        } catch (err) {
            req.flash('alert', 'Error occurred');
            next(err);
        }
    });
};

exports.edit = function(req, res, next) {
    co(function * () {
        try {
            var user = req.session.user,
                id = req.params.id;
            const services = yield req.getServices();
            const attendanceDataService = services.attendanceDataService;
            const studentDataService = services.studentDataService;
            const students = studentDataService.getStudents();
            const attendance = attendanceDataService.edit(id);
            const result = yield[students,
                attendance];
            res.render('edit-attendance', {
                students: result[0],
                attendance: result[1],
                user: user,
                layout: 'teachers'
            });
        } catch (err) {
            req.flash('alert', 'Error occurred');
            next(err);
        }
    });
};

exports.update = function(req, res, next) {
    co(function * () {
        try {
            var user = req.session.user,
                id = req.params.id,
                data = {
                    student_id: req.body.student_id,
                    lesson: req.body.lesson
                };
            const services = yield req.getServices();
            const attendanceDataService = services.attendanceDataService;
            const result = attendanceDataService.update(data, id);
            req.flash('success', 'Record updated');
            res.redirect('/attendance');
        } catch (err) {
            res.redirect('/attendance');
            req.flash('alert', 'Error occurred');
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    co(function * () {
        try {
            var user = req.session.user,
                id = req.params.id;
            const services = yield req.getServices();
            const attendanceDataService = services.attendanceDataService;
            const result = attendanceDataService.delete(id);
            req.flash('success', 'Record deleted');
            res.redirect('/attendance');
        } catch (err) {
            res.redirect('/attendance');
            req.flash('alert', 'Error occurred');
            next(err);
        }
    });
};
