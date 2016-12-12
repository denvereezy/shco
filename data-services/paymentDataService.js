const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.create = function(data) {
        return queryDataService.executeQuery('insert into payments set ?', data);
    };

    this.showPayment = function(id) {
        return queryDataService.executeQuery('select * from payments where teacher_id = ?', id);
    };

    this.edit = function(id) {
        return queryDataService.executeQuery('select payments.id, name, month, status, payment_date, amount, teachers.id as teacher_id from payments inner join teachers on payments.teacher_id = teachers.id where payments.id = ?', id);
    };

    this.showPayments = function() {
        return queryDataService.executeQuery('select payments.id, name, amount, month, status, DATE_FORMAT(payment_date,"%d %b %y") as payment_date from payments inner join teachers on payments.teacher_id = teachers.id order by payments.id desc');
    };

    this.show = function() {
        return queryDataService.executeQuery('select id as teacher_id, name from teachers');
    };

    this.update = function(data, id) {
        return queryDataService.executeQuery('update payments set ? where payments.id = ?', [data, id]);
    };

    this.delete = function(id) {
        return queryDataService.executeQuery('delete from payments where id = ?', id);
    };

    this.showOtherPayments = function() {
        return queryDataService.executeQuery('select id, DATE_FORMAT(payment_date,"%d %b %y") as payment_date, amount, comments from extras');
    };

    this.otherPayments = function(data) {
        return queryDataService.executeQuery('insert into extras set ?', data);
    };
};
