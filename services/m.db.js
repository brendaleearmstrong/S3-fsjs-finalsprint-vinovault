require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db("Auth"); // Replace "Auth" with your actual database name
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    throw error;
  }
}

async function close() {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB", error);
    throw error;
  }
}

module.exports = { connect, close };