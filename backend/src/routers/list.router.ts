import express from "express"
import passport from "passport"

import { IsAdmin } from "../middleware/authMiddle"

import { 
  addListCtrl, 
  getListsCtrl, 
  deleteListCtrl, 
  updateListCtrl, 
  findListCtrl, 
  deleteMultipleListsCtrl, 
  modifyMultipleListsStatusCtrl 
} from "../controllers/list.ctrl"
import "../utils/passport"

const router = express.Router()

router.use(passport.authenticate('jwt', { session: false }))

router.post("/", addListCtrl)
router.get("/", getListsCtrl)
router.delete("/:id", deleteListCtrl)
router.put("/:id", updateListCtrl)
router.post("/search", findListCtrl)
router.post("/delete_many", IsAdmin(true), deleteMultipleListsCtrl)
router.post("/update_many", IsAdmin(true), modifyMultipleListsStatusCtrl)

export default router
