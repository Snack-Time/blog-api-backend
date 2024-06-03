const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_posts_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: GET ALL POSTS")
});

exports.get_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: GET SINGULAR POST")
});

exports.create_post = [
    body('title', 'Title cannot be blank or exceed 50 characters!')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 50 }),

    body('content', 'Content cannot be blank!')
    .trim()
    .notEmpty()
    .isString(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const testUser = await User.findOne({ username: "WilliamMcNally" })
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: testUser,
            comments: [],
        });
    
        console.log(errors)
        if (!errors.isEmpty()) {
            res.send(errors)
            return
        }
        else {
            await blog.save();
            res.send('Blog post successfully made')
        }
})];

exports.update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: UPDATE POST")
});

exports.delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: DELETE POST")
});