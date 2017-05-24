const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.receivedPayments = function(identifier) {
        return queryDataService.executeQuery(`select payments.id,
                                              month, DATE_FORMAT(payment_date,"%d %b %y") as payment_date,
                                                amount, status, teacher_id, name, username, identifier from
                                                 payments inner join teachers on payments.teacher_id = teachers.id
                                                  inner join users on teachers.name = users.username where identifier = ?`, identifier);
    };

    this.acceptPayment = function(status, id) {
        return queryDataService.executeQuery('update payments set status = ? where id = ?', [status, id]);
    };
};
