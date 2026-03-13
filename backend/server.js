const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const key = require("./config/key")

const app = express()

mongoose.connect(key.mongoURI)
    .then(() => {console.log("MongoDB connected successfully")})
    .catch(err => {console.log("MongoDB connection error: ", err)})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})