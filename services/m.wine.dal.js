const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

async function fullTextSearch(searchString) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('vinovault');
        const collection = database.collection('wine');

        const result = await collection.find({
            $text: { $search: searchString }
        }).toArray();

        return result;
    } finally {
        await client.close();
    }
}

module.exports = {
    fullTextSearch
};