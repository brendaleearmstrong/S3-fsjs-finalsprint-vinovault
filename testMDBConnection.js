require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Load MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Debug logging
console.log("MONGO_URI:", uri);

if (!uri) {
  throw new Error("MONGO_URI is not defined. Please check your .env file.");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

testConnection().catch(console.dir);
