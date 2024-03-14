// Import the express model
const express = require('express');

// Create a location to hold the functioning of the router
const router = express.Router();

// Import the controller that creates the blog post
const {
    createPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost
} = require('../controllers/BlogPost');


// Import the Middleware file
const { authMiddleware } = require('../middlewares/authorizeMiddleware')


// Create the needed routers and add the security Middleware measure when posting, patching, or deleting
router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost)


//Export
module.exports = router;
