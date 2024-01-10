const express = require("express");
const app = express();

require('dotenv').config();
require('./db');
const PORT = 8000;

// Parse incoming requests with JSON payloads
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: 'Task Manager API is working!'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
