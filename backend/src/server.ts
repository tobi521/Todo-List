import express, { Application } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import passport from "passport"
import cors from "cors"
import * as dotenv from 'dotenv'

// import passportConfig from "./utils/passport"
import router from "./routers"

const app: Application = express()
const port = process.env.PORT || undefined
const MongoURI:string = process.env.MONGO_URI || ""

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))

mongoose.connect(MongoURI)
  .then(() => {console.log("MongoDB connected successfully")})
  .catch(err => {console.log("MongoDB connection error: ", err)})


app.use("/api", router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
