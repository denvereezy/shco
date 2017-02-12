const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.update = function(password, username) {
        return queryDataService.executeQuery('update users set password = ? where username = ?', [password, username]);
    };
};
