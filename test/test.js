const assert = require('assert'),
    LoginDataService = require('../data-services/loginDataService'),
    UserDataService = require('../data-services/userDataService'),
    TeacherDataService = require('../data-services/teacherDataService'),
    PaymentDataService = require('../data-services/paymentDataService'),
    encryptonator = require('encryptonator'),
    mysql = require('mysql'),
    co = require('co'),
    password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER || 'user',
    password: 'password',
    port: 3306,
    database: 'testDB'
});
connection.connect();

const teacherDataService = new TeacherDataService(connection),
    loginDataService = new LoginDataService(connection),
    userDataService = new UserDataService(connection)
    paymentDataService = new PaymentDataService(connection);

describe('testing auth service', function() {
    it('should add user to database', function(done) {
        co(function*() {
            try {
                const data = {
                    username: 'bibbo',
                    role: 'admin',
                    identifier: 'bb'
                };
                const hash = yield encryptonator.encryptPassword('1234');
                data.password = hash;
                const user = yield userDataService.add(data);
                assert(user);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should prevent adding user to database if username is taken', function(done) {
        co(function*() {
            try {
                const data = {
                    username: 'donkey',
                    role: 'teacher',
                    identifier: 'dd'
                };
                const hash = yield encryptonator.encryptPassword('1234');
                data.password = hash;
                const checkedUsername = yield userDataService.checkUsername(data.username);
                const result = checkedUsername[0] !== undefined;
                if (result) {
                    assert(result, 'True');
                } else {
                    const user = yield userDataService.add(data);
                    assert(user);
                }
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should log in a user', function(done) {
        co(function*() {
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
        co(function*() {
            try {
                const id = 1;
                const password = yield encryptonator.encryptPassword('123456');
                const result = yield userDataService.update(password, id);
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
        co(function*() {
            try {
                const data = {
                    name: 'Denver',
                    surname: 'Daniels',
                };
                const teacher = yield teacherDataService.add(data);
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
        co(function*() {
            try {
                var date = new Date();
                const data = {
                    amount: 100,
                    month: 'November',
                    payment_date: date,
                    teacher_id: 1,
                    status: 'pending'
                };
                const payment = yield paymentDataService.create(data);
                assert(payment);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should show a payment for givin id', function(done) {
        co(function*() {
            try {
                const teacherId = 1;
                const result = yield paymentDataService.showPayment(teacherId);
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
        co(function*() {
            try {
                const id = 2;
                const result = yield paymentDataService.delete(id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });

    it('should update a payment', function(done) {
        co(function*() {
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
                const result = yield paymentDataService.update(data, id);
                assert(result);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
});
