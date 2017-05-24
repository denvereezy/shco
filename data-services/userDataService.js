const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.checkUsername = function(username) {
        return queryDataService.executeQuery('select * from users where username = ?', username);
    };

    this.update = function(hash, id) {
        return queryDataService.executeQuery('update users set password = ? where id = ?', [hash, id]);
    };
};
