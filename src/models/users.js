// Import Mongoose
const mongoose = require("mongoose");

// Create a schema 
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Create the model with the model name and the schema being used
const User = mongoose.model('Course-User', userSchema);

// Export
module.exports = User;