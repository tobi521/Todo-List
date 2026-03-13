import express from "express"

import userRouter from "./user"
import listRouter from "./list"

const router = express.Router()

router.use("/user", userRouter)
router.use("/list", listRouter)

export default router