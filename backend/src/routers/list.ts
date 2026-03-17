import express from "express"
import { addListCtrl, getListsCtrl, deleteListCtrl, updateListCtrl, findListCtrl, deleteMultipleListsCtrl, modifyMultipleListsStatusCtrl } from "../controllers/list"

const router = express.Router()

router.use("/add_list", addListCtrl)
router.use("/get_lists/:id", getListsCtrl)
router.use("/delete_list/:id", deleteListCtrl)
router.use("/update_list/:id", updateListCtrl)
router.use("/find_list", findListCtrl)
router.use("/delete_multiple_lists", deleteMultipleListsCtrl)
router.use("/modify_multiple_lists_status", modifyMultipleListsStatusCtrl)

export default router
