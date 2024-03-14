// Step 1:  Import necessary modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Step 2: Create an instance of the Express application
const app = express();

// Step 3: Middleware
app.use(express.json());
app.use(  (req, res, next) => {
    console.log(req.path, req.method);
    if (req.body) {
        console.log('Request body:');
        console.log(req.body);
    }
    next();
});



// Add the routes with the "use" method, accepting the api end point and importing the routes
    // Add the route for the blog posts
app.use('/api/posts/', require('./src/routes/BlogPost'));
    // Add the route for the users:
app.use('/api/users/', require('./src/routes/userRoute'));



// Step 4: Connect to your database (MongoDB, in this case)
mongoose
    .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(    () => {
        console.log('Successfully connected to MongoDB');
    }  )
    .catch(  (error) => {
        console.log('An error occurred when attempting to connect to MongoDB:', error.message);
    }    );


// Step 5: Create a port to place inside of the env so that you can start the server.  Include a hard-coded alternative just in case it can't connect to the one you created.
const port = process.env.port || 4000;
app.listen(port, 
    () => {console.log(`The server is running on port ${port}`);});

