import { Request, Response } from 'express';

import List from "../models/list"
import validateAddListInput from "../validator/addList"

export const addList = async (req: Request, res: Response) => {
  try {
    const { errors, isValid } = validateAddListInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    let todo = {
      title: req.body.title,
      user_id: req.body.user_id,
      description: req.body.description,
      dueDate :req.body.dueDate,
      option: req.body.option,
    }

    let result;

    if(req.body.id) {
      result = await List.findByIdAndUpdate( req.body.id, todo, {new: true, upsert: true} )
    } else {
      result = await List.create(todo)
    }

    return res.status(200).json({type: true, result: result})
  } catch(err) {
    return res.status(500).json({error: "An error occurred while adding the item" })
  }
}

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find({user_id: req.params.id})

    return res.status(200).json({type: true, result: lists})
  } catch(err) {
    return res.status(500).json({error: "An error occurred while fetching the lists" })
  }
}

export const deleteList = async (req: Request, res: Response) => {
  try {
    const result = await List.findByIdAndDelete(req.params.id)

    return res.status(200).json({type: true, result: result })
  } catch(err) {
    return res.status(500).json({error: "An error occurred while deleting the item" })
  }
}

export const updateList = async (req: Request, res: Response) => {
  try {
    const result = await List.findByIdAndUpdate(req.params.id, { $set: {title: req.body.title, description: req.body.description, dueDate: req.body.dueDate, option: req.body.option, user_id: req.body.user_id, status: req.body.status}}, { returnDocument: 'after' })

    return res.status(200).json({type: true, result: result})
  } catch (err) {
    return res.status(500).json({error: "An error occurred while updating the item" })
  }
}

export const findList = async (req: Request, res: Response) => {
  try {
    let result;
    if(req.body.value !== "") {
      result = await List.find({[req.body.key]: typeof req.body.value === "string" ? { $regex: req.body.value, $options: 'i' } : req.body.value})
    } else {
      result = await List.find({})
    }

    return res.status(200).json({type: true, result: result})
  } catch (err) {
    return res.status(500).json({error: "An error occurred while fetching the item" })
  }
}
