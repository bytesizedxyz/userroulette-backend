const knex = require('../db/knex');

const createUser = ({username, first_name, last_name, email, bio, link}) => {
  return new Promise((res, rej) => {
    knex("Users")
    .insert({username, first_name, last_name, email, bio, link})
    .returning("*")
    .then(data => {
      res(data);
    })
    .catch(err => {
      console.log(err)
      rej(err)})
  })
}

const getUser = (username) => {
  return new Promise((res, rej) => {
    knex("Users")
    .select("username", "first_name", "last_name", "link", "bio", "email")
    .where("username", username)
    .then(data => {
      res(data)
    })
    .catch(err => {
      rej(err)
    })
  })
}

const getRandUser = () => {
  return new Promise((res, rej) => {
    knex("Users")
      .count("username")
      .then(data => {
        return (maxLength = Math.floor(Math.random() * (+data[0].count - +1)) + +1);
      })
      .then(length => {
        knex("Users")
          .select("username", "first_name", "last_name", "link", "bio", "email")
          .where({ id: length })
          .then(data => res(data))
          .catch(err => {
            console.log(err);
            throw err;
          });
      })
      .catch(err => {
        console.log(err);
        rej(err);
      });
  });
};
module.exports = {
  getUser,
  getRandUser,
  createUser
}