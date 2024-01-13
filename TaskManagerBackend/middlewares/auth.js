const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Only once the token is verified, the procedure is moved forward
const auth = async (req, res, next) => {
    try { 

        // Getting the token then replace the Bearer with empty string
        // example of a token Bearer spjjfs09983fjospdjoasd12wq4
        const token = req.header('Authorization').replace('Bearer', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Find the user with the specific Id
        const user = await User.findOne({
            _id: decoded._id
        })

        if(!user){
            throw new Error('Unable to login, invalid Credentials');
        }

        req.user = user;
        req.token = token;
        next();
    }
    catch(error){
        res.status(401).send({ error: error.message });
    }
}

module.exports = auth;