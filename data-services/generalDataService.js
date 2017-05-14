const QueryService = require('./queryDataService');

module.exports = function(connection){
  const queryDataService = new QueryService(connection);

  this.insert = function(tableName, data){
    return queryDataService.executeQuery(`insert into ${tableName} set ?`, data);
  };

  this.select = function(tableName){
    return queryDataService.executeQuery(`select * from ${tableName}`);
  };

  this.update = function(tableName, data, id){
    return queryDataService.executeQuery(`update ${tableName} set ? where id = ${id}`, data);
  };

  this.delete = function(tableName, id){
    return queryDataService.executeQuery(`delete from ${tableName} where id = ${id}`);
  };

  this.edit = function(tableName, id){
    return queryDataService.executeQuery(`select * from ${tableName} where id = ${id}`);
  };
};
