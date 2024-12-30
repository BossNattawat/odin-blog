const express = require('express');
const router = express.Router()
const Post = require('../models/Post');

router.get("/", (req, res) => {
    let login = req.session.login
    res.render("index", {login:login})
})

router.get("/blog", (req, res) => {
    let login = req.session.login
    Post.find().exec()
    .then((doc) => {
        res.render("blog", {login:login, blog:doc})
    })
    .catch((err) => {
        console.error(err);
    })
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
    
})

router.get("/createBlog", (req, res) => {
    let login = req.session.login
    if(login){
        res.render("createBlog", {login:login})
    }
    else{
        res.redirect("/login")
    }
})

router.get("/blog/:id", (req, res) => {
    let login = req.session.login
    let id = req.params.id

    Post.findById(id).exec()
    .then((doc) => {
        res.render("blogPreview", {blog:doc, login:login})
    })
    .catch((err) => {
        console.error(err);
    })
})

router.post("/addComment/:id", async (req, res) => {
    let id = req.params.id

    const { comment } = req.body

    const post = await Post.findById(id)

    console.log(post);

    const newComment = {
        author: req.session.user.fullname,
        comment: comment
    }

    post.comments.push(newComment)

    await post.save()

    console.log("Comment save successfully");
    res.redirect(`/blog/${id}`)
})

router.post("/createNewPost", (req, res) => {
    const { title, content } = req.body

    let data = new Post({
        author: req.session.user.fullname,
        author_id: req.session.user.id,
        title:title,
        content:content,
        comments: []
    })

    Post.savePost(data)
    .then(() => {
        res.redirect("/blog")
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving post")
    })
})

module.exports = router