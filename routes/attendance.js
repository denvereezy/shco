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
