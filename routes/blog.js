const express = require('express');
const router = express.Router();

const blog_controller = require("../controllers/blogController");
const comment_controller = require("../controllers/commentController");

// BLOG SPECIFIC ROUTES

router.get('/', blog_controller.get_posts_list);

router.post('/', blog_controller.create_post);

router.get('/:id', blog_controller.get_post);

router.put('/:id', blog_controller.update_post);

router.delete('/:id', blog_controller.delete_post);

// BLOG AND COMMENT ROUTES

router.post('/:id/comments', comment_controller.create_comment_on_post);

router.get('/:id/comments', comment_controller.get_comments_on_post);

router.get('/:id/comments/:commentid', comment_controller.get_comment);

router.delete('/:id/comments/:commentid', comment_controller.delete_comment);

router.put('/:id/comments/:commentid', comment_controller.update_comment);


module.exports = router;