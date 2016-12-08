const QueryDataService = require('./queryDataService');
const encryptonator = require('encryptonator');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);
    this.login = function(username) {
        return queryDataService.executeQuery('select * from users where username = ?', username);
    };
};
