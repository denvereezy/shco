const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);
    this.add = function(data) {
        return queryDataService.executeQuery('insert into users set ?', data);
    };

    this.checkUsername = function(username) {
      return queryDataService.executeQuery('select * from users where username = ?', username);
    };
};
