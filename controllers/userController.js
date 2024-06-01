const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_user = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: GET A USER")
});

exports.get_users = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: GET LIST OF USERS")

exports.create_user = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: CREATE A USER")
});

exports.update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: UPDATE POST")
});

exports.delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: DELETE POST")
});