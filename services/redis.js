const client = require("../config/redis");
const { getRandUser } = require("./users");
const knex = require("../db/knex");

const addCachedUser = async user => {
  user = JSON.stringify(user);
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
        res(JSON.parse(data));
      }
    });
  });
}

async function generateCachedUser() {
  const user = getRandUser();
  addCachedUser(user);
  return user;
}

module.exports = {
  getCachedUser
};
