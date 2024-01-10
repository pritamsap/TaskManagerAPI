const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");


require('dotenv').config();
require('./db');
const PORT = 8000;

// Parse incoming requests with JSON payloads
app.use(express.json());

// whatever API we call will start with /users
app.use('/users', userRoutes)


// whatever API we call will start with /routes
app.use('/tasks', taskRoutes)

app.get("/", (req, res) => {
    res.json({
        message: 'Task Manager API is working!'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
