import express from "express"

import userRouter from "./user.router"
import listRouter from "./list.router"

const router = express.Router()

router.use("/auth", userRouter)
router.use("/list", listRouter)

export default router