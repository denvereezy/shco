const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.takeAttendance = function(data) {
        return queryDataService.executeQuery('insert into attendance set ?', data);
    };

    this.getAttendance = function(){
      return queryDataService.executeQuery('select attendance.id, student_id, DATE_FORMAT(lesson,"%d %b %y") as lesson, name from attendance inner join students on student_id = students.id');
    };
};
