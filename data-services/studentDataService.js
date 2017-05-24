const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
  const queryDataService = new QueryDataService(connection);

  this.getStudents = function() {
    return queryDataService.executeQuery('select * from students order by id desc');
  };
};
