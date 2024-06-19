const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const comment_controller = require("../controllers/commentController");

const verifyToken = require('../config/verifyToken')

// USER SPECIFIC ROUTES

router.get('/', user_controller.get_all_users);

router.post('/', user_controller.create_user);

router.get('/:id', user_controller.get_user);

// USER + BLOG ROUTES

router.get('/:id/posts', user_controller.get_posts_by_user);

// USER + COMMENTS ROUTES

router.get('/:id/comments', comment_controller.get_comments_by_user);

// USER SPECIFIC ROUTES NEEDING A TOKEN

router.put('/:id', verifyToken, user_controller.update_user);

router.delete('/:id', verifyToken, user_controller.delete_user);

module.exports = router;
