import { loginCtrl, registerCtrl } from "../controllers/user"
import express from "express"
import { Response, Request } from "express"

const router = express.Router()

router.use("/login", loginCtrl)
router.use("/register", registerCtrl)

export default router;