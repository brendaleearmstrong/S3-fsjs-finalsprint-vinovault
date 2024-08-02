// This file needs to be updated 
const dal = require("./p.db");

var getFullText = function(text) {
  if(DEBUG) console.log("postgres.dal.getFullText()");
  return new Promise(function(resolve, reject) {

    const sql = `SELECT name, winery, type, description FROM wine \
    WHERE description iLIKE '%'||$1||'%' \
          OR type iLIKE '%'||$1||'%' \
        OR name iLIKE '%'||$1||'%' \
      OR winery iLIKE '%'||$1||'%'`;

    //  const sql = `SELECT title, description FROM film \
    //     WHERE description iLIKE '%'||$1||'%' \
    //     OR title iLIKE '%'||$1||'%'`;

    if(DEBUG) console.log(sql);
    dal.query(sql, [text], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log(`Row count: ${result.rowCount}`);
        resolve(result.rows);
      }
    }); 
  }); 
};

module.exports = {
    getFullText,
}