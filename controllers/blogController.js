const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_posts_list = asyncHandler(async (req, res, next) => {
    let postList = await Blog.find({}).populate('author');
    res.json(postList);
});

exports.get_post = asyncHandler(async (req, res, next) => {
    let post = await Blog.findById(req.params.id).populate('author');
    res.json(post);
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
        const testUser = await User.findOne({ username: "Kaientai" })
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

exports.update_post = [
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
        let postToUpdate = await Blog.findById(req.params.id);
        const errors = validationResult(req);
        postToUpdate = ({
            title: req.body.title,
            content: req.body.content,
            author: postToUpdate.author,
            comments: postToUpdate.comments,
            date_published: postToUpdate.date_published,
            date_edited: Date.now(),
        });
    
        console.log(errors)
        if (!errors.isEmpty()) {
            res.send(errors)
            return
        }
        else {
            await Blog.findByIdAndUpdate(req.params.id, postToUpdate);
            res.send('Blog post successfully updated')
        }
})];

exports.delete_post = asyncHandler(async (req, res, next) => {
    let postToDelete = await Blog.findById(req.params.id);
    await Blog.findByIdAndDelete(req.params.id);
    res.send(`${postToDelete.title} successfully deleted.`);
});