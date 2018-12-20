const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const {getUser, createUser} = require('../services/users');
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
  createUser(req.body)
  .then(response=>{
      res.status(301).json({ user:response });
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json(err);
  });
 
});

module.exports = router;
