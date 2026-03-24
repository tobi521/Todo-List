import express from "express"
import passport from "passport"

import {IsAdmin} from "../utils/authMiddle"

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

router.post("/add_list", addListCtrl)
router.get("/get_lists", getListsCtrl)
router.delete("/delete_list/:id", deleteListCtrl)
router.post("/update_list/:id", updateListCtrl)
router.post("/find_list", findListCtrl)
router.post("/delete_multiple_lists", IsAdmin(true), deleteMultipleListsCtrl)
router.post("/modify_multiple_lists_status", IsAdmin(true), modifyMultipleListsStatusCtrl)

export default router
