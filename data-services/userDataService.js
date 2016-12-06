const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);
    this.add = function(data) {
        return queryDataService.executeQuery('insert into users set ?', data);
    };

    this.checkUsername = function(username) {
      return queryDataService.executeQuery('select * from users where username = ?', username);
    };

    this.profile = function(id){
      return queryDataService.executeQuery('select * from users where id = ?', id);
    };

    this.update = function(hash, id){
      return queryDataService.executeQuery('update users set password = ? where id = ?', [hash, id]);
    };
};
