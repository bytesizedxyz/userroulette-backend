const knex = require("../db/knex");

const createUser = ({ username, first_name, last_name, email, bio, link }) => {
  return new Promise((res, rej) => {
    knex("Users")
      .insert({ username, first_name, last_name, email, bio, link })
      .returning("*")
      .then(data => {
        res(data);
      })
      .catch(err => {
        console.log(err);
        rej(err);
      });
  });
};

const getUser = username => {
  return new Promise((res, rej) => {
    knex("Users")
      .select("username", "first_name", "last_name", "link", "bio", "email")
      .where("username", username)
      .then(data => {
        res(data);
      })
      .catch(err => {
        rej(err);
      });
  });
};

async function getRandUser() {
  let data = await knex("Users")
    .count("*")
    .catch(err => {
      console.log(err);
    });
  const length = data[0].count;
  const newUserId = Math.floor(Math.random() * length) + 1;
  const user = await knex("Users")
    .select()
    .where("id", newUserId)
    .catch(err => console.log("error in generate cached user:", err));

  console.log("got random user: ", user);
  return user;
}

module.exports = {
  getUser,
  getRandUser,
  createUser
};
