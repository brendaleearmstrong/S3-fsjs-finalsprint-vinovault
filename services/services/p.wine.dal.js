const dal = require('./p.db');

async function fullTextSearch(searchString) {
    const query = `
        SELECT WineID, Name, Winery, Region, Country, Type, Color, Price, Rating, Description, Logo
        FROM Wine
        WHERE to_tsvector('english', Name || ' ' || Winery || ' ' || Region || ' ' || Country || ' ' || Type || ' ' || Color || ' ' || Description) @@ to_tsquery('english', $1)
    `;
    const result = await dal.query(query, [searchString]);
    return result.rows;
}

async function getDistinctCountries() {
    const query = 'SELECT DISTINCT Country FROM Wine ORDER BY Country';
    const result = await dal.query(query);
    return result.rows.map(row => row.Country);
}

async function getDistinctColors() {
    const query = 'SELECT DISTINCT Color FROM Wine ORDER BY Color';
    const result = await dal.query(query);
    return result.rows.map(row => row.Color);
}

async function getDistinctTypes() {
    const query = 'SELECT DISTINCT Type FROM Wine ORDER BY Type';
    const result = await dal.query(query);
    return result.rows.map(row => row.Type);
}

async function getDistinctWineries() {
    const query = 'SELECT DISTINCT Winery FROM Wine ORDER BY Winery';
    const result = await dal.query(query);
    return result.rows.map(row => row.Winery);
}

async function getWinesByCountry(country) {
    const query = 'SELECT * FROM Wine WHERE Country = $1';
    const result = await dal.query(query, [country]);
    return result.rows;
}

async function getWinesByColor(color) {
    const query = 'SELECT * FROM Wine WHERE Color = $1';
    const result = await dal.query(query, [color]);
    return result.rows;
}

async function getWinesByType(type) {
    const query = 'SELECT * FROM Wine WHERE Type = $1';
    const result = await dal.query(query, [type]);
    return result.rows;
}

async function getWinesByWinery(winery) {
    const query = 'SELECT * FROM Wine WHERE Winery = $1';
    const result = await dal.query(query, [winery]);
    return result.rows;
}

module.exports = {
    fullTextSearch,
    getDistinctCountries,
    getDistinctColors,
    getDistinctTypes,
    getDistinctWineries,
    getWinesByCountry,
    getWinesByColor,
    getWinesByType,
    getWinesByWinery
};