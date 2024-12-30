const mongoose = require('mongoose');

const comment = mongoose.Schema({
    author: {type: String, require: true},
    comment: {type: String, require: true},
})

const postSchema = mongoose.Schema({
    author: {type: String, require: true},
    author_id:{type: String, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    comments: [comment],
    createAt: {type: Date, default: Date.now}
})

let Post = mongoose.model("Post", postSchema)

module.exports = Post

module.exports.savePost = (data) => {
    const post = new Post(data)
    return post.save()
    .then(() => {
        console.log("Post saved successfully!")
    })
    .catch((err) => {
        console.error("Error saving post:", err);
    })
} 