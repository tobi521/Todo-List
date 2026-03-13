import { Request, Response } from 'express';
import { addList, getLists, deleteList, updateList, findList } from "../services/list"

export const addListCtrl = (req: Request, res: Response) => {
  addList(req, res)
}

export const getListsCtrl = (req: Request, res: Response) => {
  getLists(req, res)
}

export const deleteListCtrl = (req: Request, res: Response) => {
  deleteList(req, res)
}

export const updateListCtrl = (req: Request, res: Response) => {
  updateList(req, res)
} 

export const findListCtrl = (req: Request, res: Response) => {
  findList(req, res)
}
