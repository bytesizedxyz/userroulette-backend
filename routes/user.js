const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const { createUser, getUser, getRandUser } = require("../services/users");
const { getCachedUser } = require("../services/redis");

router.get("/featured", function(req, res, next) {
  getCachedUser(req.body).then(data => {
    res.status(200).json(data);
  });
});

router.get("/random", function(req, res, next) {
  getRandUser()
    .then(response => {
      res.json({ user: response });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get('/:username', function(req, res, next) {
  getUser(req.params.username)
  .then(response=>{
    res.json({ user:response });
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json(err);
  });
});

router.post("/", function(req, res, next) {
  createUser(req.body)
    .then(response => {
      res.status(201).json({ user: response });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
