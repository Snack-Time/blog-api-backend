const express = require('express');
const router = express.Router();

const blog_controller = require("../controllers/blogController");
const comment_controller = require("../controllers/commentController");

// BLOG SPECIFIC ROUTES

router.get('/', blog_controller.get_posts_list);

router.post('/', blog_controller.create_post);

router.get('/:postid', blog_controller.get_post);

router.put('/:postid', blog_controller.update_post);

router.delete('/:postid', blog_controller.delete_post);

// BLOG AND USER ROUTES

router.get('/:userid', blog_controller.get_posts_by_user);

// BLOG AND COMMENT ROUTES

router.post('/:postid/comments', comment_controller.create_comment_on_post);

router.get('/:postid/comments', comment_controller.get_comments_on_post);

router.get('/:postid/comments/:commentid', comment_controller.get_comment);

router.delete('/:postid/comments/:commentid', comment_controller.delete_comment);

router.put('/:postid/comments/:commentid', comment_controller.update_comment);


module.exports = router;