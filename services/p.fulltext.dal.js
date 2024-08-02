// This file needs to be updated 
const dal = require("./p.db");

async function getFullText(text) {
  if(DEBUG) console.log("postgres.dal.getFullText()");
  return new Promise(function(resolve, reject) {
    const searchTerms = text.split(' ').map(term => term + ':*').join(' & ');
    const sql = `SELECT WineID, Name, Winery, Region, Country, Type, Color, Price, Rating, Description, Logo
                 FROM Wine
                 WHERE to_tsvector('english', Name || ' ' || Winery || ' ' || Region || ' ' || Country || ' ' || Type || ' ' || Color || ' ' || Description) @@ to_tsquery('english', $1)`;
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
        const sql = "SELECT DISTINCT Country FROM Wine ORDER BY Country";
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
        const sql = "SELECT DISTINCT Color FROM Wine ORDER BY Color";
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
        const sql = "SELECT DISTINCT Type FROM Wine ORDER BY Type";
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
        const sql = "SELECT DISTINCT Winery FROM Wine ORDER BY Winery";
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
        const sql = "SELECT * FROM Wine WHERE Country = $1";
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
        const sql = "SELECT * FROM Wine WHERE Color = $1";
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
        const sql = "SELECT * FROM Wine WHERE Type = $1";
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
        const sql = "SELECT * FROM Wine WHERE Winery = $1";
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