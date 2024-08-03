import dotenv from 'dotenv'; // Use import for dotenv
dotenv.config(); // Initialize dotenv

function checkRole(req, res, next) {
    if (res.locals.role === process.env.USER) {
        return res.sendStatus(401); // Fixed typo: changed `sendStaus` to `sendStatus`
    } else {
        next();
    }
}

export default checkRole; // Use default export
