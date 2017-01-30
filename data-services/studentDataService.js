const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
  const queryDataService = new QueryDataService(connection);

  this.getStudents = function() {
    return queryDataService.executeQuery('select * from students order by id desc');
  };

  this.addStudent = function(data) {
    return queryDataService.executeQuery('insert into students set ?', data);
  };

  this.delete = function(id) {
    return queryDataService.executeQuery('delete from students where id = ?', id);
  };
};
