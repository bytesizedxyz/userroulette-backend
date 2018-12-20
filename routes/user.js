const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const {getUser} = require('../services/users');

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:username', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
