const { ObjectId } = require("mongodb");
const dal = require("./m.db");

async function getLogins() {
  try {
    await dal.connect();
    const cursor = dal.db("Auth").collection("logins").find();
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  }
};
async function getLoginByUsername(name) {
  try {
    await dal.connect();
    // const result = await dal.db("Author").collection("logins").findOne({"username": name});
    const result = await dal.db("Auth").collection("logins").findOne({"username": name});
    if(DEBUG) console.log('m.auth.dal.getLoginByUsername() _id: ' + result._id);
    return result;
  } catch(error) {
    console.log(error);
  }
};
async function getLoginByEmail(email) {
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("logins").findOne({ "email": email });
    return result;
  } catch(error) {
    console.log(error);
  }
};
async function getLoginById(id) {
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("logins").findOne({ _id: new ObjectId(id) });
    return result;
  } catch(error) {
    console.log(error);
  }
};

async function addLogin(name, email, password, uuidv4) {
  let newLogin = { 
    username: name, 
    email: email,
    password: password,
    uuid: uuidv4,
    last_updated: new Date()
  };
  
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("logins").insertOne(newLogin);
    return result.insertedId;
  } catch(error) {
    if(error.code === 11000)
      return error;
    console.log(error);
  }
};

module.exports = {
    getLogins,
    getLoginByUsername,
    addLogin,
    getLoginByEmail, 
    getLoginById,
  }