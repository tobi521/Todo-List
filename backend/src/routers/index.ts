import express from "express"

import userRouter from "./user"
import listRouter from "./list"

const router = express.Router()

router.use("/auth", userRouter)
router.use("/list", listRouter)

export default router