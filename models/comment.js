const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now },
    edit_timestamp: { type: Date },
    reference_post: { type: Schema.Types.ObjectId, ref: "Blog", required: true }
})

CommentSchema.virtual('timestamp_formatted').get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_SHORT);
})

module.exports = mongoose.model('Comment', CommentSchema);