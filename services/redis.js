const client = require('../config/redis');
const knex = require('../db/knex');

function addCachedUser(user){
  let blah = client.set("featured", JSON.stringify(user), 'EX', 60 * 60 , (data) => {
    return data;
  });

  console.log(blah)
  return blah
}

function getCachedUser(){
  client.get("featured", (data) => {
    if(data === null){
      generateCachedUser()
    }
  })
}

function generateCachedUser(){
  knex('users')
  .select()
  .then(data => {
    console.log(data)
  })
}

module.exports = {
  addCachedUser
}
