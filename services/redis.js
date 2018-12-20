const client = require('../config/redis');

async function addCachedUser(user){
  client.set(user.username, user, 'EX', 60 * 60 * 24, (data) => {
    console.log(data)
    return data;
  });
}

module.exports = {
  addCachedUser
}
