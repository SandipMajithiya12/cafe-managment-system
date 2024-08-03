import dotenv from 'dotenv'; // Use import for dotenv
import jwt from 'jsonwebtoken'; // Import the entire module as default
const { verify } = jwt; // Destructure the verify method

dotenv.config(); // Initialize dotenv

// Define the authenticateToken function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // No token provided

    verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) return res.sendStatus(403); // Token invalid
        res.locals = response; // Store response for later use
        next(); // Proceed to the next middleware or route handler
    });
}

// Export the authenticateToken function
export default authenticateToken; // Use default export for clarity
