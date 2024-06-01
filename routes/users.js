const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const comment_controller = require("../controllers/commentController");

router.get('/users', user_controller.get_all_users)

router.post('/users', user_controller.create_user);

router.get('/users/:userid', user_controller.get_user);

router.put('/users/:userid', user_controller.update_user);

router.delete('/users/:userid', user_controller.delete_user);

router.get('/posts/:userid', user_controller.get_posts_by_user);



module.exports = router;
