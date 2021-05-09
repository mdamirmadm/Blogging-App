const mongoose = require('mongoose');
const Comment = require('./comment');

const blogSchema = new mongoose.Schema({
    img : {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;