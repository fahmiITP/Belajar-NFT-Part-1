const express = require('express');
const router = express.Router();
const users = require('../../db/users/users');

/* GET Users. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* POST Users */
router.post('/', async function (req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

module.exports = router;