const express = require('express');
const router = express.Router();

const blog_controller = require("../controllers/blogController");
const comment_controller = require("../controllers/commentController");

// BLOG SPECIFIC ROUTES

router.get('/posts', blog_controller.get_posts_list);

router.post('/posts', blog_controller.create_post);

router.get('/posts/:postid', blog_controller.get_post);

router.put('/posts/:postid', blog_controller.update_post);

router.delete('/posts/:postid', blog_controller.delete_post);

// BLOG AND COMMENT ROUTES

router.post('/posts/:postid/comments', comment_controller.create_comment_on_post);

router.get('/posts/:postid/comments', comment_controller.get_comments_on_post);

router.get('/posts/:postid/comments/:commentid', comment_controller.get_comment);

router.delete('/posts/:postid/comments/:commentid', comment_controller.delete_comment);

router.put('/posts/:postid/comments/:commentid', comment_controller.update_comment);

module.exports = router;