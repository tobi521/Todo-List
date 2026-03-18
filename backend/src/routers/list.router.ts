import express, {Request} from "express"
import { addListCtrl, getListsCtrl, deleteListCtrl, updateListCtrl, findListCtrl, deleteMultipleListsCtrl, modifyMultipleListsStatusCtrl } from "../controllers/list.ctrl"
import "../utils/passport"
import passport from "passport"

const router = express.Router()

router.post("/add_list", passport.authenticate('jwt', { session: false }), addListCtrl)
router.get("/get_lists/:id", passport.authenticate('jwt', { session: false }), getListsCtrl)
router.post("/delete_list/:id", passport.authenticate('jwt', { session: false }), deleteListCtrl)
router.post("/update_list/:id", passport.authenticate('jwt', { session: false }), updateListCtrl)
router.post("/find_list", passport.authenticate('jwt', { session: false }), findListCtrl)
router.post("/delete_multiple_lists", passport.authenticate('jwt', { session: false }), deleteMultipleListsCtrl)
router.post("/modify_multiple_lists_status", passport.authenticate('jwt', { session: false }), modifyMultipleListsStatusCtrl)

export default router
