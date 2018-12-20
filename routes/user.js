const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const {getUser} = require('../services/users');
const { addCachedUser } = require('../services/redis');

/* GET home page. */
router.get('/', function(req, res, next) {
  let balh = addCachedUser(req.body)

  res.status(200).json(balh)
});

router.get('/:username', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
