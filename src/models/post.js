// Import Mongoose
const mongoose = require('mongoose');

// Create a Schema data structure model
const blogPostSchema = new mongoose.Schema({
    //Pass in JSON objects
    title: { type: String, required: true },
	author: { type: String, required: true },
	description: { type: String, required: true },
	likes: { type: Number },
	comments: [{ body: String }],
});

// Create a location to export to
const BlogPost = mongoose.model("Blog Post", blogPostSchema);

//Export the model
module.exports = BlogPost;
