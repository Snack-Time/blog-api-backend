const express = require('express');
const router = express.Router();

const blog_controller = require("../controllers/blogController");
const comment_controller = require("../controllers/commentController");

const verifyToken = require('../config/verifyToken')

// BLOG SPECIFIC ROUTES

router.get('/',  blog_controller.get_posts_list);

router.get('/:id', blog_controller.get_post);

// BLOG AND COMMENT ROUTES

router.get('/:id/comments', comment_controller.get_comments_on_post);

router.get('/:id/comments/:commentid', comment_controller.get_comment);

// BLOG SPECIFIC ROUTES NEEDING A TOKEN

router.post('/', verifyToken, blog_controller.create_post);

router.put('/:id', verifyToken, blog_controller.update_post);

router.delete('/:id', verifyToken, blog_controller.delete_post);

// BLOG AND COMMENT ROUTES NEEDING A TOKEN

router.delete('/:id/comments/:commentid', verifyToken, comment_controller.delete_comment);

router.put('/:id/comments/:commentid', verifyToken, comment_controller.update_comment);

router.post('/:id/comments', verifyToken, comment_controller.create_comment_on_post);


module.exports = router;