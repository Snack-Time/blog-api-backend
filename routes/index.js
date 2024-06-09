var express = require('express');
var router = express.Router();

const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello! I am an API.');
});

router.post('/sign-in', async function(req, res, next) {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    return res.status(401).json({errors: 'Incorrect Username'})
  }
  const match = await bcrypt.compare(req.body.password, user.password)
  if (!match) {
    return res.status(401).json({errors: 'Incorrect Password'})
  }

  const token = jwt.sign({ user }, 'secretkey', {
    expiresIn: "1d",
  })
  res.status(200).json({ user, token })
})

module.exports = router;
