import express, { Application } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"

import key from "./config/key"
import router from "./routers"

const app: Application = express()
const port = 5000

app.use(bodyParser.json())
app.use("/api", router)

mongoose.connect(key.mongoURI)
    .then(() => {console.log("MongoDB connected successfully")})
    .catch(err => {console.log("MongoDB connection error: ", err)})

import "./utils/passport"

app.listen(port, () => {
    console.log("Server is running on port 5000")
})
