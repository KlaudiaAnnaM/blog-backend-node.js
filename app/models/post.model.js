const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    content: String,
    imgUrl: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Post', PostSchema);
