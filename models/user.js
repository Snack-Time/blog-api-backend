const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["User", "Author"],
        default: "User",
    }
});

UserSchema.virtual('url').get(function () {
    return `/users/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);