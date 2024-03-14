
const express = require('express');
const router = express.Router();

//Import the functions into our routes
const { signupUser, loginUser } = require('../controllers/userController');

// If creating a new user/password pair uses the body
router.post('/signup', signupUser);

// Log in uses the body as well
router.post('/login', loginUser);



//Export this router
module.exports = router;