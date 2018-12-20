const client = require('../config/redis');
const knex = require('../db/knex');

// documentation here: https://github.com/NodeRedis/node_redis


// TODO:
// post user into the caching solution.
// current issue is that when retrieving the user it is null
function addCachedUser(user) {
  user = JSON.stringify(user)
  let blah = client.set("featured", user, 'EX', 60 * 60, (err, ok) => {
    console.log(err);
    console.log(ok.toString())
  });
  return blah
}

//TODO: retrieve from caching solution.
// currently the data being retrieved is null, possible issue with storing.
function getCachedUser() {
  return new Promise((res, rej) => {
    client.get("featured", (err, data) => {
      if (err) {
        console.log(err);
        rej(err)
      }
      if (data === null) {
        res(generateCachedUser())
      } else {
        console.log("kappa", data)
        res(JSON.parse(data))
      }
    })
  })

}

async function generateCachedUser() {
  let data = await knex('Users')
    .select("id")
    .catch(err => {
      console.log(err)
    })
  
  const newUserId = Math.floor(Math.random() * data.length) + 1  
  const user = await knex("Users").select().where("id", newUserId).catch(err => console.log("error in generate cached user:", err))
  addCachedUser(user)
  return user;
}

module.exports = {
  getCachedUser
}