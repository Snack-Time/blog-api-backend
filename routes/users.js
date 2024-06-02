const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const comment_controller = require("../controllers/commentController");

// USER SPECIFIC ROUTES

router.get('/', user_controller.get_all_users)

router.post('/', user_controller.create_user);

router.get('/:userid', user_controller.get_user);

router.put('/:userid', user_controller.update_user);

router.delete('/:userid', user_controller.delete_user);

// USER + COMMENTS ROUTES

// router.get('/users/:userid/comments', comment_controller.get_comments_by_user) [BREAKS EVERYTHING CURRENTLY]

module.exports = router;
