const co = require('co');

exports.takeAttendance = function(req, res, next) {
    co(function * () {
        try {
            var data = {
                student_id: req.body.student_id,
                lesson: req.body.lesson,
                subject_id: req.body.subject_id
            };
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = yield generalDataService.insert('attendance', data);
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
            const generalDataService = services.generalDataService;
            const attendanceDataService = services.attendanceDataService;
            const students = generalDataService.select('students');
            const attendance = attendanceDataService.getAttendance();
            const subjects = generalDataService.select('subjects');
            const result = yield[students,
                attendance, subjects];
            res.render('attendance', {
                students: result[0],
                attendance: result[1],
                subject: result[2],
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
            const generalDataService = services.generalDataService;
            const students = generalDataService.select('students');
            const attendance = generalDataService.edit('attendance', id);
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
            var id = req.params.id,
                data = {
                    student_id: req.body.student_id,
                    lesson: req.body.lesson
                };
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = generalDataService.update('attendance', data, id);
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
            var id = req.params.id;
            const services = yield req.getServices();
            const generalDataService = services.generalDataService;
            const result = generalDataService.delete('attendance', id);
            req.flash('success', 'Record deleted');
            res.redirect('/attendance');
        } catch (err) {
            res.redirect('/attendance');
            req.flash('alert', 'Error occurred');
            next(err);
        }
    });
};
