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

exports.create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: CREATE A POST")
});

exports.update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: UPDATE POST")
});

exports.delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: DELETE POST")
});