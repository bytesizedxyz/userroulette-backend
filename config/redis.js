const redis = require("redis");

const config = process.env.REDIS_URL || {
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST
};

const client = redis.createClient(config);

module.exports = client;
