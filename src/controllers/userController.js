// Store the model in a variable 
const User = require('../models/users');

// Store the required bcrypt and jwt in variables
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//
const signupUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check whether the potential new username already exists:
        const exists = await User.findOne({ username });
        if (exists) { return res.status(400).json({error: 'That username is already in use. Please choose a different one' })}

        // If it is a new username that doesn't already exist, ask for a password and store that in an encrypted form and say how many times to "salt" it for security
        const hashedPassword = await bcrypt.hash(password, 10) //This is 2 to the tenth times. Very secure but slower than a smaller number
        // Save the new user information
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        //Send a response of successful creation
        res.status(201).json({ newUser });
    } 
    
    catch (error) {
        res.status(400).json({error: error.message})
    }
};





// Create a controller so that the user can log in
const loginUser = async (req, res) => {
    // Destructure the username and password from the request
    const { username, password } = req.body;

    // Confirm that the entered username exists so that we can log into it
    try {
        const exists = await User.findOne({ username });
        if (!exists) { return res.status(404).json({ error: 'Sorry, but that username was not found'}); }

        // Create a boolean for comparing the entered password
        const isPasswordMatched = await bcrypt.compare(password, exists.password);
        if (!isPasswordMatched) {return res.status(400).json({ error: 'Incorrect password. Try again'}); }

        // If the username and password passes validation, create a token to store the username that just logged in and a secret token passphrase:
        const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET);
        // Send a response confirming success:
        res.status(200).json({ username, token });

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// Export
module.exports = {
    signupUser,
    loginUser,
}