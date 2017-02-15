const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
  const queryDataService = new QueryDataService(connection);

  this.getStudents = function() {
    return queryDataService.executeQuery('select * from students order by id desc');
  };

  this.addStudent = function(data) {
    return queryDataService.executeQuery('insert into students set ?', data);
  };

  this.edit = function(id) {
    return queryDataService.executeQuery('select * from students where id = ?', id);
  };

  this.update = function(data, id) {
    return queryDataService.executeQuery('update students set ? where id = ?', [data, id]);
  };
};
