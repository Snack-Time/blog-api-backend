const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date_published: { type: Date, default: Date.now, required: true },
    date_edited: { type: Date },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }]
})

BlogSchema.virtual('url').get(function () {
    return `/posts/${this._id}`;
});

BlogSchema.virtual('date_pub_formatted').get(function() {
    return DateTime.fromJSDate(this.date_published).toLocaleString(DateTime.DATETIME_FULL);
});

BlogSchema.virtual('date_edit_formatted').get(function() {
    return DateTime.fromJSDate(this.date_edited).toLocaleString(DateTime.DATETIME_FULL);
});

module.exports = mongoose.model('Blog', BlogSchema);