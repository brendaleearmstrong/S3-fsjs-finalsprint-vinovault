const { ObjectId } = require("mongodb");
const { connect, close } = require("./m.db");

async function getLogins() {
  let db;
  try {
    db = await connect();
    const cursor = db.collection("logins").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (db) await close();
  }
}

async function getLoginByUsername(name) {
  let db;
  try {
    db = await connect();
    const result = await db.collection("logins").findOne({ "username": name });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (db) await close();
  }
}

async function getLoginByEmail(email) {
  let db;
  try {
    db = await connect();
    const result = await db.collection("logins").findOne({ "email": email });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (db) await close();
  }
}

async function getLoginById(id) {
  let db;
  try {
    db = await connect();
    const result = await db.collection("logins").findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (db) await close();
  }
}

async function addLogin(name, email, password, uuidv4) {
  const newLogin = { 
    username: name, 
    email: email,
    password: password,
    uuid: uuidv4,
    last_updated: new Date()
  };
  
  let db;
  try {
    db = await connect();
    const result = await db.collection("logins").insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    if (error.code === 11000) return error;
    console.log(error);
    throw error;
  } finally {
    if (db) await close();
  }
}

module.exports = {
    getLogins,
    getLoginByUsername,
    addLogin,
    getLoginByEmail,
    getLoginById,
}