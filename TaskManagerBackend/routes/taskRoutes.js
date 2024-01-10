const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send('Task routes are working!')
})

//CRUD task

module.exports = router;



