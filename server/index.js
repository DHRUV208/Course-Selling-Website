const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use((req, res, next)=>{
    res.header("Content-Type", "application/json;charset=UTF-8")
    res.header("Access-Control-Allow-Credentials", true)
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )

    next();
});

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect('mongodb://127.0.0.1:27017/courses', {  dbName: "courses" });

app.listen(3005, ()=>{
    console.log("Server running on port 3005")
});
