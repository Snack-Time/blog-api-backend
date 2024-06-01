const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_comments_on_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: GET COMMENTS ON POST")
});

exports.create_comment_on_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: CREATE A COMMENT")
});

exports.get_comment = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: GET A SPECIFIC COMMENT")
});

exports.delete_comment = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: DELETE A COMMENT")
});

exports.update_comment = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: EDIT A COMMENT")
});