const knex = require('../db/knex');
const getUser = () => {

}

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
module.exports = {
  getUser,
  createUser
}