const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')

exports.get_user = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.id);
    res.json(user);
});

exports.get_all_users = asyncHandler(async (req, res, next) => {
    let userList = await User.find({});
    res.json(userList);
});

exports.create_user = [
    body('username', 'Username must be at least 3 characters!')
    .trim()
    .isLength({ min: 3 })
    .custom(async value => {
        const user = await User.findOne({ username: `${value}` }).exec()
        console.log(user)
        if (user) {
            throw new Error('Username already in use!')
        }
    })
    .escape(),

    body('password', 'Password must be at least 5 characters!')
    .trim()
    .isLength({ min: 5 })
    .escape(),
    body('confirmpassword', 'Password must match!')
    .custom((value, { req }) => {
        return value === req.body.password;
    }),

    body('email', 'Not a valid address!')
    .trim()
    .isEmail()
    .custom(async value => {
        const user = await User.findOne({ email: `${value}` }).exec()
        console.log(user)
        if (user) {
            throw new Error('Email already in use!')
        }
    })
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            res.send(errors)
            return
        }
        else {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err) {
                    return next(err)
                }
                try {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        email: req.body.email,
                    });
                    const result = await user.save();
                    res.send('User created successfully')
                }
                catch(err) {
                    return next(err)
                }
            })
        }
})];

exports.update_user = asyncHandler(async (req, res, next) => {
    let userToUpdate = await User.findById(req.params.id);
    userToUpdate.status = "Author";
    let updatedUser = await User.findByIdAndUpdate(req.params.id, userToUpdate);
    res.json(updatedUser);
});

exports.delete_user = asyncHandler(async (req, res, next) => {
    let userToDelete = await User.findById(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.send(`${userToDelete.username} successfully deleted.`);
});