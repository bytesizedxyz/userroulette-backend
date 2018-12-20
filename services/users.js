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
  getUser
}