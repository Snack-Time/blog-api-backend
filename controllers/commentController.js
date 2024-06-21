const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_comments_on_post = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id).populate('comments')
    res.json(blog.comments)
});

exports.create_comment_on_post = [
    body('content', 'Comment cannot be blank!')
    .trim()
    .notEmpty()
    .isString(),
    
    asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const userData = req.authData;
    const blog = await Blog.findById(req.params.id);
    const comment = new Comment({
        content: req.body.content,
        user: userData.user._id,
        reference_post: req.params.id,
    });

    console.log(errors)
    if (!errors.isEmpty()) {
        res.send(errors)
        return
    }
    else {
        await comment.save()
        blog.comments.push(comment)
        await blog.save()
        res.send('Comment successfully posted')
    }
})]

exports.get_comment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentid)
    res.json(comment)
});

exports.delete_comment = asyncHandler(async (req, res, next) => {
    
    let user = req.authData.user;
    let blog = await Blog.findById(req.params.id)
    let comment = await Comment.findById(req.params.commentid)
    
    // check if end user is either Author or the original commenter
    if (blog.author.toString() !== user._id || comment.user.toString() !== user._id) {
        res.json({"authError": "Authorization failed: Comment needs to be deleted by original author or author of blog post."})
        return
    }
    
    // remove reference from post
    let index = blog.comments.indexOf(`${req.params.commentid}`)
    blog.comments.splice(index, 1)
    await blog.save()
    
    // remove comment
    await Comment.findByIdAndDelete(req.params.commentid)
    res.send('Comment successfully deleted')
});

exports.update_comment = [
    body('content', 'Comment cannot be blank!')
    .trim()
    .notEmpty()
    .isString(),
    
    asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const oldComment = await Comment.findById(req.params.commentid)
    const newComment = {
        content: req.body.content,
        user: oldComment.user,
        reference_post: oldComment.reference_post,
        timestamp: oldComment.timestamp,
        edit_timestamp: Date.now()
    }

    console.log(errors)
    if (!errors.isEmpty()) {
        res.send(errors)
        return
    }
    else {
        await Comment.findByIdAndUpdate(req.params.commentid, newComment)
        res.send('Comment successfully updated')
    }
})];

exports.get_comments_by_user = asyncHandler(async (req, res, next) => {
    let allCommentsByUser = await Comment.find({ user: req.params.id }).exec();
    res.json(allCommentsByUser)
});