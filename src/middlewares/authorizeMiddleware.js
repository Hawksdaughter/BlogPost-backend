//  This is a final check in the middle before allowing access to the user

const jwt = require('jsonwebtoken');

// What steps should be required for access:
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json( { error: "FORBIDDEN: Access Denied"} );

    try {
        // Verify the recieved token
        const decoded = jwt.verify (
            // Taken in the token string without the bearer prefix
            token.substring(7),
            //Take in the secret key
            process.env.JWT_SECRET
        );
        // Verify the user and assign an id to it
        req.user = { userID: decoded.id };

        //Proceed to the next function in the stack
        next();

    } catch (error) {
        res.status(403).json( { error: 'Access Denied'})
    }
}




//Export the function
module.exports = {
    authMiddleware
};