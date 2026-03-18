import { Request, Response } from 'express';
import { addList, getLists, deleteList, updateList, findList, deleteMultipleLists, modifyMultipleListsStatus } from "../services/list.service"

export const addListCtrl = (req: Request, res: Response) => {
  try {
    addList(req, res)
  } catch(err) {
    return res.status(500).json({error: "An error occurred while adding the item" })
  }
}

export const getListsCtrl = (req: Request, res: Response) => {
  try {
    getLists(req, res)
  } catch(err) {
    return res.status(500).json({error: "An error occurred while fetching the lists" })
  }
}

export const deleteListCtrl = (req: Request, res: Response) => {
  try {
    deleteList(req, res)
  } catch(err) {
    return res.status(500).json({error: "An error occurred while deleting the item" })
  }
}

export const updateListCtrl = (req: Request, res: Response) => {
  try{
    updateList(req, res)
  } catch(err) {
    return res.status(500).json({error: "An error occurred while updating the item" })
  }
} 

export const findListCtrl = (req: Request, res: Response) => {
  try {
    findList(req, res)
  } catch(err) {
    return res.status(500).json({error: "An error occurred while finding the item" })
  }
}

export const deleteMultipleListsCtrl = (req: Request, res: Response) => {
  try {
    deleteMultipleLists(req, res)
  } catch(err) {
    return res.status(500).json({error: "An error occurred while deleting the items" })
  }
}

export const modifyMultipleListsStatusCtrl = (req: Request, res: Response) => {
  try{
    modifyMultipleListsStatus(req, res)
  } catch(err) {
    return res.status(500).json({error: "An error occurred while modifying the status of the items" })
  }
}