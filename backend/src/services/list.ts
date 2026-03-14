import { Request, Response } from 'express';

import List from "../models/list"
import validateAddListInput from "../validator/addList"

export const addList = async (req: Request, res: Response) => {
  try {
    const { errors, isValid } = validateAddListInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newList = new List({
      title: req.body.title,
      user_id: req.body.user,
      description: req.body.description
    })

    const result = await newList.save()
    return res.status(200).json({type: true, result: result})

  } catch(err) {
    return res.status(500).json({error: "An error occurred while adding the item" })
  }
}

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find({}).populate("user_id", ["name", "email"])

    console.log(lists)

    return res.status(200).json({type: true, result: lists})

  } catch(err) {
    console.log(err)
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
    const result = await List.findByIdAndUpdate(req.params.id)

    return res.status(200).json({type: true, result: result})
  } catch (err) {
    return res.status(500).json({error: "An error occurred while updating the item" })
  }
}

export const findList = async (req: Request, res: Response) => {
  try {
    const result = await List.find({ title: { $regex: req.body.keyword, $options: "i" } })

    return res.status(200).json({type: true, result: result})
  } catch (err) {
    return res.status(500).json({error: "An error occurred while fetching the item" })
  }
}
