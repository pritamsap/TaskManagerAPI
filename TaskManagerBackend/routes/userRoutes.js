const express = require("express");
const { append } = require("express/lib/response");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
    res.send('User routes are working!')
})

/*CRUD operations*/


//Registration of user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
try {
    const user = new User({ name, email, password});
    await user.save();
    res.status(201).send({ user, message : "User created successfully" });
}
catch(err) {
    res.status(400).send({ error: err });
}
});


// Login a user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            throw new Error('Unable to login, invalid credentials')
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new Error('Unable to login, invalid credentials')
        }

        const token = jwt.sign({
            _id: user._id.toString()
        });
    }
    catch (err) {
            res.status(400).send({ error: err });
    }
});


module.exports = router;



