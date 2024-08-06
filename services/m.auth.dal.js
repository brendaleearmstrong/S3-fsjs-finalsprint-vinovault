const { ObjectId } = require("mongodb");
const { connect, close } = require("./m.db");
const myEventEmitter = require('./logEvents');

async function getLogins() {
  let db;
  try {
    console.log('Fetching all logins');
    db = await connect();
    const cursor = db.collection("logins").find();
    const results = await cursor.toArray();
    console.log(`Successfully fetched ${results.length} logins`);
    myEventEmitter.emit('event', 'getLogins', 'INFO', `Fetched ${results.length} logins`);
    return results;
  } catch (error) {
    console.error('Error fetching logins:', error);
    myEventEmitter.emit('event', 'getLogins', 'ERROR', `Failed to fetch logins: ${error.message}`);
    throw error;
  } finally {
    if (db) await close();
  }
}

async function getLoginByEmail(email) {
  let db;
  try {
    console.log(`Attempting to fetch login for email: ${email}`);
    db = await connect();
    const result = await db.collection("logins").findOne({ "email": email });
    console.log(result ? `Login found for email: ${email}` : `No login found for email: ${email}`);
    myEventEmitter.emit('event', 'getLoginByEmail', 'INFO', `Login retrieval attempt for email: ${email}`);
    return result;
  } catch (error) {
    console.error(`Error fetching login for email ${email}:`, error);
    myEventEmitter.emit('event', 'getLoginByEmail', 'ERROR', `Failed to fetch login for email ${email}: ${error.message}`);
    throw error;
  } finally {
    if (db) await close();
  }
}

async function getLoginById(id) {
  let db;
  try {
    console.log(`Attempting to fetch login for id: ${id}`);
    db = await connect();
    const result = await db.collection("logins").findOne({ _id: new ObjectId(id) });
    console.log(result ? `Login found for id: ${id}` : `No login found for id: ${id}`);
    myEventEmitter.emit('event', 'getLoginById', 'INFO', `Login retrieval attempt for id: ${id}`);
    return result;
  } catch (error) {
    console.error(`Error fetching login for id ${id}:`, error);
    myEventEmitter.emit('event', 'getLoginById', 'ERROR', `Failed to fetch login for id ${id}: ${error.message}`);
    throw error;
  } finally {
    if (db) await close();
  }
}

async function addLogin(name, email, password, uuidv4) {
  let db;
  try {
    console.log(`Attempting to add new login for email: ${email}`);
    db = await connect();
    
    // Check if email already exists
    const existingUser = await db.collection("logins").findOne({ email: email });
    if (existingUser) {
      console.log(`Attempt to register duplicate email: ${email}`);
      myEventEmitter.emit('event', 'addLogin', 'WARN', `Attempt to register duplicate email: ${email}`);
      return { error: 'Email already registered' };
    }

    const newLogin = { 
      username: name, 
      email: email,
      password: password,
      uuid: uuidv4,
      last_updated: new Date()
    };
    
    const result = await db.collection("logins").insertOne(newLogin);
    console.log(`New login added with id: ${result.insertedId}`);
    myEventEmitter.emit('event', 'addLogin', 'INFO', `New login added for email: ${email}`);
    return { id: result.insertedId };
  } catch (error) {
    console.error(`Error adding new login for email ${email}:`, error);
    myEventEmitter.emit('event', 'addLogin', 'ERROR', `Failed to add new login for email ${email}: ${error.message}`);
    throw error;
  } finally {
    if (db) await close();
  }
}

module.exports = {
    getLogins,
    getLoginByEmail,
    addLogin,
    getLoginById,
}