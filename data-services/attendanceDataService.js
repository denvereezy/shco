const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.getAttendance = function(){
      return queryDataService.executeQuery(`
        select attendance.id, student_id, DATE_FORMAT(lesson,"%d %b %y") as lesson,
          name, subject from attendance
            inner join students
              on student_id = students.id
                inner join subjects
                  on subject_id = subjects.id`
      );
    };
};
