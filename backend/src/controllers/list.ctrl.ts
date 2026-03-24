import { Request, Response } from 'express';
import { 
  addList, 
  getLists, 
  deleteList, 
  updateList, 
  findList, 
  deleteMultipleLists, 
  modifyMultipleListsStatus 
} from "../services/list.service"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: string;
      };
    }
  }
}

export const addListCtrl = async (req: Request, res: Response) => {
  try {
    const result = await addList(req.body);

    if(result.type) 
      return res.status(200).json({ ...result });
    else return res.status(400).json({ ...result });
  } catch(err) {
    return res.status(500).json({error: 500})
  }
}

export const getListsCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await getLists(id);

    return res.status(200).json({ ...result });
  } catch(err) {
    return res.status(500).json({error: 500})
  }
}

export const deleteListCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string 

    const result = await deleteList(id);

    return res.status(200).json({ ...result });
  } catch(err) {
    return res.status(500).json({error: 500})
  }
}

export const updateListCtrl = async (req: Request, res: Response) => {
  try{
    const id = req.params.id as string

    const result = await updateList(req.body, { id });

    return res.status(200).json({ ...result });
  } catch(err) {
    return res.status(500).json({error: 500})
  }
} 

export const findListCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;

    const result = await findList(req.body, id);

    return res.status(200).json({ ...result });
  } catch(err) {
    return res.status(500).json({error: 500})
  }
}

export const deleteMultipleListsCtrl = async (req: Request, res: Response) => {
  try {
    const result = await deleteMultipleLists(req.body);

    return res.status(200).json({ ...result });
  } catch(err) {
    return res.status(500).json({error: 500})
  }
}

export const modifyMultipleListsStatusCtrl = async (req: Request, res: Response) => {
  try{
    const result = await modifyMultipleListsStatus(req.body);

    return res.status(200).json({ ...result });
  } catch(err) {
    return res.status(500).json({error: 500})
  }
}