const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.add = function(subject) {
        return queryDataService.executeQuery('insert into subjects set ?', subject);
    };

    this.show = function(subject) {
      return queryDataService.executeQuery('select * from subjects');
    };

    this.edit = function(id) {
      return queryDataService.executeQuery('select * from subjects where id = ?', id);
    };

    this.update = function(data, id) {
      return queryDataService.executeQuery('update subjects set ? where id = ?', [data, id]);
    };
};
