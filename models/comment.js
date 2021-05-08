const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String
    }
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;