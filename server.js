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

const login    = require('./routes/login');
const payments = require('./routes/payments');
const router   = require('./routes/router');
const teachers = require('./routes/teachers');
const users    = require('./routes/users');

const TeacherDataService = require('./data-services/teacherDataService');
const QueryDataService   = require('./data-services/queryDataService');
const LoginDataService   = require('./data-services/loginDataService');
const PaymentDataService = require('./data-services/paymentDataService');
const UserDataService    = require('./data-services/userDataService');

const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'shco'
};

const serviceSetupCallBack = function (connection) {
  return {
    queryDataService    : new QueryDataService(connection),
    teacherDataService  : new TeacherDataService(connection),
    loginDataService    : new LoginDataService(connection),
    paymentDataService  : new PaymentDataService(connection),
    userDataService     : new UserDataService(connection)
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
app.use(router.checkUser);
app.get('/home', router.checkUser, router.home);
app.get('/make-payment', router.checkUser, payments.showAdd);
app.post('/create', router.checkUser, payments.addPayment);
app.get('/payments', router.checkUser, payments.show);
app.get('/edit/:id', router.checkUser, payments.edit);
app.post('/payment/update/:id', router.checkUser, payments.update);
app.post('/delete/:id', router.checkUser, payments.delete);
app.get('/received-payments', router.checkUser, teachers.receivedPayments);
app.get('/profile', router.checkUser, users.profile);
app.post('/profile/update/:id', router.checkUser, users.update);
app.post('/teacher-payment/update/:id', router.checkUser, teachers.acceptPayment);
app.get('/extras', router.checkUser, payments.showOtherPayments);
app.get('/add-payment', router.checkUser, router.add);
app.post('/add-payment', router.checkUser, payments.addOtherPayment);
app.get('/edit/payment/:id', router.checkUser, payments.editOtherPayment);
app.post('/update/payment/:id', router.checkUser, payments.updateOtherPayment);
app.post('/delete/payment/:id', router.checkUser, payments.deleteOtherPayment);
app.get('/logout', router.checkUser, router.checkUser, router.logout);


const port = process.env.PORT || 2000;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
