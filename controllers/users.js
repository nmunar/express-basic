const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "users";
const bcrypt = require("bcrypt");
const auth = require("../lib/utils/auth.js");
const saltRounds = 10;

async function login(user) {
  return mongoUtils.conn().then(async (client) => {
    const requestedUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ username: user.username })
      .finally(() => client.close());

    const isValid = await bcrypt.compare(user.password, requestedUser.password);
    let currentUser = { ...requestedUser };
    if (isValid) {
      delete currentUser.password;
      let token = auth.createToken(currentUser);
      currentUser.token = token;
      return currentUser;
    } else {
      throw new Error("Authetication failed");
    }
  });
}

async function createUser(user) {
  if (user.password) {
    user.password = await bcrypt.hashSync(user.password, saltRounds);
  }
  // Save new user with password hashed
  return mongoUtils.conn().then(async (client) => {
    const newUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne(user)
      .finally(() => client.close());
    // TODO Delete sensitive information
    newUser && newUser.ops ? delete newUser.ops[0].password : newUser;
    return newUser.ops[0];
  });
}

module.exports = [createUser, login];
