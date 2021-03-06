const assert                = require('assert'),
      LoginDataService      = require('../data-services/loginDataService'),
      UserDataService       = require('../data-services/userDataService'),
      TeacherDataService    = require('../data-services/teacherDataService'),
      PaymentDataService    = require('../data-services/paymentDataService'),
      StudentDataService    = require('../data-services/studentDataService'),
      AttendanceDataService = require('../data-services/attendanceDataService'),
      GeneralDataService    = require('../data-services/generalDataService'),
      encryptonator         = require('encryptonator'),
      mysql                 = require('mysql'),
      co                    = require('co'),
      password              = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: password,
    port: 3306,
    database: 'testDB'
});
connection.connect();

const teacherDataService    = new TeacherDataService(connection),
      loginDataService      = new LoginDataService(connection),
      userDataService       = new UserDataService(connection)
      paymentDataService    = new PaymentDataService(connection),
      studentDataService    = new StudentDataService(connection),
      attendanceDataService = new AttendanceDataService(connection),
      generalDataService    = new GeneralDataService(connection);

describe('testing auth service', function() {
    it('should add user to database', function(done) {
        co(function * () {
            try {
                const data = {
                    username: 'bibbo',
                    role: 'admin',
                    identifier: 'bb',
                    email: 'test@email.com'
                };
                const hash = yield encryptonator.encryptPassword('1234');
                data.password = hash;
                const user = yield generalDataService.insert('users', data);
                assert(user);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should prevent adding user to database if username is taken', function(done) {
        co(function * () {
            try {
                const data = {
                    username: 'donkey',
                    role: 'teacher',
                    identifier: 'dd',
                    email: 'test@email.com'
                };
                const hash = yield encryptonator.encryptPassword('1234');
                data.password = hash;
                const checkedUsername = yield userDataService.checkUsername(data.username);
                const result = checkedUsername[0] !== undefined;
                if (result) {
                    assert(result, 'True');
                } else {
                    const user = yield generalDataService.insert('users', data);
                    assert(user);
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should log in a user', function(done) {
        co(function * () {
            try {
                const data = {
                    username: 'bibbo',
                    password: '1234'
                };
                const user = yield loginDataService.login(data.username);
                const pass = yield encryptonator.comparePassword(data.password, user[0].password);
                if (pass) {
                    assert(user, 'False');
                } else {
                    assert(user, 'True');
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should update a user password', function(done) {
        co(function * () {
            try {
                const id = 1;
                const password = yield encryptonator.encryptPassword('123456');
                const result = yield userDataService.update('users', password, id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
});

describe('testing teacher service', function() {
    it('should add a teacher', function(done) {
        co(function * () {
            try {
                const data = {
                    name: 'Denver',
                    surname: 'Daniels'
                };
                const teacher = yield generalDataService.insert('teachers', data);
                assert(teacher);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
});

describe('testing payment service', function() {
    it('should make a payment', function(done) {
        co(function * () {
            try {
                var date = new Date();
                const data = {
                    amount: 100,
                    month: 'November',
                    payment_date: date,
                    teacher_id: 1,
                    status: 'pending'
                };
                const payment = yield generalDataService.insert('payments', data);
                assert(payment);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show a payment for givin id', function(done) {
        co(function * () {
            try {
                const teacherId = 1;
                const result = yield generalDataService.select('payments', teacherId);
                if (result) {
                    assert(result, 'True');
                } else {
                    assert(result, 'False');
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should delete a payment', function(done) {
        co(function * () {
            try {
                const id = 2;
                const result = yield generalDataService.delete('payments', id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should update a payment', function(done) {
        co(function * () {
            try {
                const id = 2;
                var date = new Date();
                const data = {
                    amount: 200,
                    month: 'October',
                    payment_date: date,
                    teacher_id: 1,
                    status: 'confirmed'
                }
                const result = yield generalDataService.update('payments', data, id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should make payment for other activities', function(done) {
        co(function * () {
            try {
                var data = {
                    month: 'n/a',
                    payment_date: '2016-12-10',
                    amount: 7000,
                    comments: 'got new amps'
                };
                const result = yield generalDataService.insert('extras', data);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show payments for other activities', function(done) {
        co(function * () {
            try {
                const result = yield generalDataService.select('extras');
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show payment for other activities to edit', function(done) {
        co(function * () {
            try {
                var id = 1;
                const result = yield generalDataService.edit('extras', id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should update payment for other activities', function(done) {
        co(function * () {
            try {
                var id = 1,
                    data = {
                        amount: 11,
                        payment_date: '2017-01-07',
                        comments: 'n/a'
                    };
                const result = yield generalDataService.update('extras', data, id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should delete payment for other activities', function(done) {
        co(function * () {
            try {
                const id = 1;
                const result = yield generalDataService.delete('extras', id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
});

describe('testing student service', function() {
    it('should add a student', function(done) {
        co(function * () {
            try {
                const data = {
                    name: 'Student',
                    surname: 'One'
                };
                const student = yield generalDataService.insert('students', data);
                assert(student);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show students', function(done) {
        co(function * () {
            try {
                const result = yield generalDataService.select('students');
                if (!result.length) {
                    assert(result, 0);
                } else {
                    assert(result);
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should edit a student', function(done) {
        co(function * () {
            try {
                var id = 1;
                const result = yield generalDataService.edit('students', id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should update a student', function(done) {
        co(function * () {
            try {
                var id = 1,
                    data = {
                        name: 'bobby',
                        surname: 'brown'
                    };
                const result = yield generalDataService.update('students', data, id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should soft delete a student', function(done) {
        co(function * () {
            try {
                var id = 1,
                    data = {
                        deleted: 1
                    };
                const result = yield generalDataService.update('students', data, id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show all studends not soft deleted', function(done) {
        co(function * () {
            try {
                const result = yield studentDataService.getStudents();
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
});

describe('testing subject service', function() {
    it('should add a subject', function(done) {
        co(function * () {
            try {
                const subject = {
                    subject: 'guitar'
                };
                const result = yield generalDataService.insert('subjects', subject);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show subjects', function(done) {
        co(function * () {
            try {
                const subjects = yield generalDataService.select('subjects');
                if (!subjects.length) {
                    assert(subjects, 0);
                } else {
                    assert(subjects);
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show subject for id given', function(done) {
        co(function * () {
            try {
                const id = 1;
                const result = yield generalDataService.edit('subjects', id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should update a subject', function(done) {
        co(function * () {
          try {
              const id = 1;
              const data = {
                subject: 'guitar theory'
              };
              const result = yield generalDataService.update('subjects', data, id);
              assert(result);
              done();
          } catch (err) {
            console.log(err);
          };
      });
  });
});

describe('testing attendance service', function() {
    it('should take attendance for day given', function(done) {
        co(function * () {
            try {
                var d = new Date();
                const data = {
                    student_id: 1,
                    lesson: d,
                    subject_id: 1
                };
                const result = yield generalDataService.insert('attendance', data);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show attendance record', function(done) {
        co(function * () {
            try {
                const result = yield attendanceDataService.getAttendance();
                if (!result.length) {
                    assert(result, 0);
                } else {
                    assert(result);
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should edit attendance record', function(done) {
        co(function * () {
            try {
                const id = 1;
                const result = yield generalDataService.edit('attendance', id);
                if (!result.length) {
                    assert(result, 0);
                } else {
                    assert(result);
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should update attendance record', function(done) {
        co(function * () {
            try {
                const id = 2,
                    date = new Date(),
                    data = {
                        student_id: 2,
                        lesson: date,
                        subject_id: 1
                    };
                const result = yield generalDataService.update('attendance', data, id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should delete attendance record', function(done) {
        co(function * () {
            try {
                const id = 1;
                const result = yield generalDataService.delete('attendance', id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
});
