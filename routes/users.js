const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const comment_controller = require("../controllers/commentController");

// USER SPECIFIC ROUTES

router.get('/', user_controller.get_all_users)

router.post('/', user_controller.create_user);

router.get('/:id', user_controller.get_user);

router.put('/:id', user_controller.update_user);

router.delete('/:id', user_controller.delete_user);

// USER + BLOG ROUTES

router.get('/:id/posts', user_controller.get_posts_by_user);

// USER + COMMENTS ROUTES

// router.get('/users/:userid/comments', comment_controller.get_comments_by_user) [BREAKS EVERYTHING CURRENTLY]

module.exports = router;
