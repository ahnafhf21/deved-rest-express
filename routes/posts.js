const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GET POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch(e){
        res.json({message: e});
    }
});

//GET SPECIFIC POST
router.get('/:postID', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postID);
        res.json(post);
    }catch(e){
        res.json({message: e});
    }
});

//DELETE POST
router.delete('/:postID', async (req, res) => {
    try{
        const deletedPost = await Post.remove({_id: req.params.postID });
        res.json(deletedPost);
    }catch(e){
        res.json({message: e});
    }
});

//SUBMIT POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save()
        res.json(savedPost);
    }catch(e){
        res.json({message: e});
    }
});

//UPDATE POST
router.patch('/:postID', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postID }, 
            {$set: {title: req.body.title, description: req.body.description}
        });
        res.json(updatedPost);
    }catch(e){

    }
});

module.exports = router;