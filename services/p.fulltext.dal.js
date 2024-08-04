// p.fulltext.dal.js

const dal = require("./p.db");

async function getFullText(text) {
  if(DEBUG) console.log("postgres.dal.getFullText()");
  return new Promise(function(resolve, reject) {
    const searchTerms = text.split(' ').map(term => term + ':*').join(' & ');
    const sql = `SELECT wineid, name, winery, region, country, type, color, price, rating, description, logo
                 FROM Wine
                 WHERE to_tsvector('english', name || ' ' || winery || ' ' || region || ' ' || country || ' ' || type || ' ' || color || ' ' || description) @@ to_tsquery('english', $1)`;
    if(DEBUG) console.log(sql, searchTerms);
    dal.query(sql, [searchTerms], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log(`Row count: ${result.rowCount}`);
        resolve(result.rows);
      }
    }); 
  }); 
}

async function getDistinctCountries() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT DISTINCT country FROM Wine ORDER BY country";
        dal.query(sql, [], (err, result) => {
            if (err) {
                console.error('Error fetching countries:', err);
                reject(err);
            } else {
                resolve(result.rows.map(row => row.country));
            }
        });
    });
}

async function getDistinctColors() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT DISTINCT color FROM Wine ORDER BY color";
        dal.query(sql, [], (err, result) => {
            if (err) {
                console.error('Error fetching colors:', err);
                reject(err);
            } else {
                resolve(result.rows.map(row => row.color));
            }
        });
    });
}

async function getDistinctTypes() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT DISTINCT type FROM Wine ORDER BY type";
        dal.query(sql, [], (err, result) => {
            if (err) {
                console.error('Error fetching types:', err);
                reject(err);
            } else {
                resolve(result.rows.map(row => row.type));
            }
        });
    });
}

async function getDistinctWineries() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT DISTINCT winery FROM Wine ORDER BY winery";
        dal.query(sql, [], (err, result) => {
            if (err) {
                console.error('Error fetching wineries:', err);
                reject(err);
            } else {
                resolve(result.rows.map(row => row.winery));
            }
        });
    });
}

async function getWinesByCountry(country) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Wine WHERE country = $1";
        dal.query(sql, [country], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
}

async function getWinesByColor(color) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Wine WHERE color = $1";
        dal.query(sql, [color], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
}

async function getWinesByType(type) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Wine WHERE type = $1";
        dal.query(sql, [type], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
}

async function getWinesByWinery(winery) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Wine WHERE winery = $1";
        dal.query(sql, [winery], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
    getFullText,
    getDistinctCountries,
    getDistinctColors,
    getDistinctTypes,
    getDistinctWineries,
    getWinesByCountry,
    getWinesByColor,
    getWinesByType,
    getWinesByWinery
};