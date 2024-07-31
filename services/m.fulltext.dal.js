const { ObjectId } = require("mongodb");
const dal = require("./m.db");

async function getFullText(fulltext) {
  if(DEBUG) console.log("mongo.dal.getFullText()");
  try {
    await dal.connect();
    const database = dal.db("Auth");
    const collection = database.collection("autos");
    const result = await collection.find({ $text: { $search: fulltext } }).toArray();
    return result;
  } catch(err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    throw err;
  } finally {
    dal.close();
  }
};

module.exports = {
    getFullText,
  }