const router = require('express').Router();

const Post = require('../models/post.model');

router.route('/').get((req, resp) => {
  User.find();
});

modules.exports = router;
