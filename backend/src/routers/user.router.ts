import { loginCtrl, registerCtrl } from "../controllers/user.ctrl"
import express from "express"

const router = express.Router()

router.post("/login", loginCtrl)
router.post("/register", registerCtrl)

export default router;