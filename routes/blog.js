const express = require('express');
const router = express.Router();

const blog_controller = require("../controllers/blogController");

router.get('/posts', blog_controller.get_posts_list);

router.get('/posts/:id', blog_controller.get_post);

router.post('/posts', blog_controller.create_post);

router.put('/posts/:id', blog_controller.update_post);

router.delete('/posts/:id', blog_controller.delete_post);