const express      = require('express'),
      exhbs        = require('express-handlebars'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      bodyParser   = require('body-parser'),
      mysql        = require('mysql'),
      connectionPv = require('connection-provider'),
      compression  = require('compression'),
      flash        = require('express-flash'),
      app          = express();

const login      = require('./routes/login');
const payments   = require('./routes/payments');
const router     = require('./routes/router');
const teachers   = require('./routes/teachers');
const users      = require('./routes/users');
const students   = require('./routes/students');
const attendance = require('./routes/attendance');
const reset      = require('./routes/reset');

const TeacherDataService    = require('./data-services/teacherDataService');
const QueryDataService      = require('./data-services/queryDataService');
const LoginDataService      = require('./data-services/loginDataService');
const PaymentDataService    = require('./data-services/paymentDataService');
const UserDataService       = require('./data-services/userDataService');
const StudentDataService    = require('./data-services/studentDataService');
const AttendanceDataService = require('./data-services/attendanceDataService');
const ResetDataService      = require('./data-services/resetDataService');

const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'shco'
};

const serviceSetupCallBack = function (connection) {
  return {
    queryDataService      : new QueryDataService(connection),
    teacherDataService    : new TeacherDataService(connection),
    loginDataService      : new LoginDataService(connection),
    paymentDataService    : new PaymentDataService(connection),
    userDataService       : new UserDataService(connection),
    studentDataService    : new StudentDataService(connection),
    attendanceDataService : new AttendanceDataService(connection),
    resetDataService      : new ResetDataService(connection)
  }
};

app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret : 'keyboard cat', cookie :{ maxAge : 3600000 }, resave : true, saveUninitialized : true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(compression());
app.use(flash());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.get('/', router.login);
app.post('/login', login.login);
app.get('/password/reset', router.reset);
app.post('/password/reset', reset.reset);

app.use(router.checkUser);

app.get('/home', router.checkUser, router.home);
app.get('/profile', router.checkUser, users.profile);
app.post('/profile/update/:id', router.checkUser, users.update);

app.get('/make-payment', router.checkUser, router.adminRoute, payments.showAdd);
app.post('/create', router.checkUser, router.adminRoute, payments.addPayment);
app.get('/payments', router.checkUser, router.adminRoute, payments.show);
app.get('/edit/:id', router.checkUser, router.adminRoute, payments.edit);
app.post('/payment/update/:id', router.checkUser, router.adminRoute, payments.update);
app.post('/delete/:id', router.checkUser, router.adminRoute, payments.delete);
app.get('/add-payment', router.checkUser, router.adminRoute, router.add);
app.post('/add-payment', router.checkUser, router.adminRoute, payments.addOtherPayment);
app.get('/edit/payment/:id', router.checkUser, router.adminRoute, payments.editOtherPayment);
app.post('/update/payment/:id', router.checkUser, router.adminRoute, payments.updateOtherPayment);
app.post('/delete/payment/:id', router.checkUser, router.adminRoute, payments.deleteOtherPayment);
app.get('/extras', router.checkUser, router.adminRoute, payments.showOtherPayments);

app.get('/received-payments', router.checkUser, router.teacherRoute, teachers.receivedPayments);
app.post('/teacher-payment/update/:id', router.checkUser, router.teacherRoute, teachers.acceptPayment);
app.get('/attendance', router.checkUser, router.teacherRoute, attendance.getAttendance);
app.post('/attendance', router.checkUser, router.teacherRoute, attendance.takeAttendance);
app.get('/addendance/edit/:id', router.checkUser, router.teacherRoute, attendance.edit);
app.post('/addendance/update/:id', router.checkUser, router.teacherRoute, attendance.update);
app.post('/addendance/delete/:id', router.checkUser, router.teacherRoute, attendance.delete);
app.get('/students', router.checkUser, router.teacherRoute, students.show);
app.post('/student/add', router.checkUser, router.teacherRoute, students.addStudent);
app.get('/student/edit/:id', router.checkUser, router.teacherRoute, students.edit);
app.post('/student/update/:id', router.checkUser, router.teacherRoute, students.update);

app.get('/logout', router.checkUser, router.checkUser, router.logout);


const port = process.env.PORT || 2000;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
