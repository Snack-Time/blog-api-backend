const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_comments_on_post = asyncHandler(async (req, res, next) => {
    res.send('hiroshi tanahashi')
});

exports.create_comment_on_post = [
    body('content', 'Comment cannot be blank!')
    .trim()
    .notEmpty()
    .isString(),
    
    asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const testUser = await User.findOne({ username: "Kaientai" });
    const blog = await Blog.findById(req.params.id)
    const comment = new Comment({
        content: req.body.content,
        user: testUser,
        reference_post: req.params.id,
    })

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
    res.send("NOT IMPLEMENTED: DELETE A COMMENT")
});

exports.update_comment = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: EDIT A COMMENT")
});

exports.get_comments_by_user = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: GET COMMENTS BY USER")
});