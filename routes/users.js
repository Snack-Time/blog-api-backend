const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const comment_controller = require("../controllers/commentController");

// USER SPECIFIC ROUTES

router.get('/users', user_controller.get_all_users)

router.post('/users', user_controller.create_user);

router.get('/users/:userid', user_controller.get_user);

router.put('/users/:userid', user_controller.update_user);

router.delete('/users/:userid', user_controller.delete_user);

// USER + BLOG POST ROUTES

router.get('/posts/:userid', user_controller.get_posts_by_user);

// USER + COMMENTS ROUTES

router.get('/users/:userid/comments', comment_controller.get_comments_by_user)

module.exports = router;
