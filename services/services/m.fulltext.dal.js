const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

async function getFullText(text) {
  console.log('getFullText called with:', text);
  const client = new MongoClient(uri);
  try {
    console.log('Attempting MongoDB connection');
    await client.connect();
    console.log('MongoDB connected successfully');

    const database = client.db('vinovault');
    const collection = database.collection('wine');

    console.log('Performing MongoDB search with text:', text);
    if (!text || typeof text !== 'string') {
      console.error('Invalid search text provided:', text);
      return []; // Return empty array instead of throwing an error
    }

    const result = await collection.find({
      $text: { $search: text }
    }).toArray();

    console.log(`MongoDB search complete. Found ${result.length} results.`);
    return result;
  } catch (error) {
    console.error('Error in MongoDB full-text search:', error);
    throw error;  // Re-throw the error to be handled by the caller
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = {
  getFullText
};