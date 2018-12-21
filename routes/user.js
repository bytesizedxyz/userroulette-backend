const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const { getUser } = require("../services/users");
const { getCachedUser } = require("../services/redis");

router.get("/featured", function(req, res, next) {
  getCachedUser(req.body).then(data => {
    res.status(200).json(data);
  });
});

router.get("/:username", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
