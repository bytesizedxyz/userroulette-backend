const client = require("../config/redis");
const { getRandUser } = require("./users");
const knex = require("../db/knex");

const addCachedUser = async user => {
  user = JSON.stringify(user);
  console.log("About to cache user: ", user);
  const cachedUser = client.set("featured", user, "EX", 60 * 60, (err, ok) => {
    if (err) {
      console.log(err);
    }
  });
  return cachedUser;
};

function getCachedUser() {
  return new Promise((res, rej) => {
    client.get("featured", (err, data) => {
      if (err) {
        console.log(err);
        rej(err);
      }
      if (data === null) {
        res(generateCachedUser());
      } else {
        console.log("Got cached user: ", data);
        res(JSON.parse(data));
      }
    });
  });
}

async function generateCachedUser() {
  const user = getRandUser();
  console.log("Got random user: ", user);
  addCachedUser(user);
  return user;
}

module.exports = {
  getCachedUser
};
