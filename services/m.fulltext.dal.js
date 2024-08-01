// services/m.fulltext.dal.js
const { ObjectId } = require("mongodb");
const dal = require("./m.db");

async function getFullText(fulltext) {
  try {
    await dal.connect();
    const database = dal.db("Auth");
    const collection = database.collection("wine");
    const result = await collection.find({ $text: { $search: fulltext } }).toArray();
    return result;
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    throw err;
  } finally {
    await dal.close();
  }
};

module.exports = {
    getFullText,
};
