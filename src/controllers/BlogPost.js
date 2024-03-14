// Import the post schema model
const BlogPost = require('../models/post');



// CRUD stands for the controllers of Create, Read, Update, Delete



//=========================================================
// CREATE
//=========================================================

// Create a function expression as a controller for the blog post, taking in a request and a response, and destructuring the body of that request
const createPost = async(req, res) => {
    const { title, author, description, likes, comments } = req.body;

    // and ensure that you wait for the post model that you created above to arrive
    try {
        const post = await BlogPost.create(
            { title, author, description, likes, comments }
        );
        // Display success by displaying the 200 status
        res.status(200).json(post);
    }
    // In case of an error, create a catch for the debuggers
    catch (error) {
        res.status(400).json({error: error.message});
    }
};




//====================
//READ
//====================

//Get all of the blog posts
const getAllPosts = async(req, res) => {
    try {
        const allPosts = await BlogPost.find();
        res.status(200).json( {
            count: allPosts.length,
            allPosts,
        } )  
    } catch (error) {
        res.status(400).json( {
            error: error.message
        } );
    };
};


// Get a single post
const getOnePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await BlogPost.findById( {_id: id } );
        if (!post) return res.status(404).json({ error: "No blog post found." })
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json( {
            error: error.message
        } );
    };
};




//===================================
// UPDATE
//===================================

// Update a post
const updatePost = async(req,res) => {
    const {id} = req.params;
    try {
        const post = await BlogPost.findByIdAndUpdate(
            {_id: id},
            {...req.body},
            {new: true, runValidators: true}
        );
        if (!post) {
            return res.status(404).json( {error: "No matching post found"} );
        };
        res.status(200).json({
            message: "The post has been successfully updated",
            post
        })
    } catch (error) {
        res.status(400).json( {
            error: error.message
        } );
    };
};


//==================================================================
// DELETE
//==================================================================

// Delete a single post
const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await BlogPost.findByIdAndDelete({_id : id});
        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        }
        res.status(200).json({
            message: "The post has been successfully deleted!"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




//=========================================================================



// Export controllers
module.exports = {
    createPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost
};