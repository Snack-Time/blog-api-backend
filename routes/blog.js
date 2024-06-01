const express = require('express');
const router = express.Router();

const blog_controller = require("../controllers/blogController");

router.get('/posts', blog_controller.get_posts_list);

router.post('/posts', blog_controller.create_post);

router.get('/posts/:postid', blog_controller.get_post);

router.put('/posts/:postid', blog_controller.update_post);

router.delete('/posts/:postid', blog_controller.delete_post);

module.exports = router;