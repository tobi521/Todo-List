import express, { Application } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import * as dotenv from 'dotenv'

import router from "./routers"

const app: Application = express()
const port = 5000

dotenv.config()

const MongoURI:string = process.env.mongoURI || ""

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use("/api", router)

mongoose.connect(MongoURI)
  .then(() => {console.log("MongoDB connected successfully")})
  .catch(err => {console.log("MongoDB connection error: ", err)})

import "./utils/passport"

app.listen(port, () => {
  console.log("Server is running on port 5000")
})
