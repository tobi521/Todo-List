import { Request, Response } from 'express';

import List from "../models/list.model"
import validateAddListInput from "../validator/addList"

// Add
export const addList = 
async (
  body: { 
    title: string; 
    user: string; 
    description: string; 
    dueDate: Date; 
    option: string, 
    id: string
  }
) => {
  const { errors, isValid } = validateAddListInput(body)
  const { 
    title, 
    user, 
    description, 
    dueDate, 
    option, 
    id 
  } = body

  if ( !isValid ) {
    return { type: false, result: errors }
  }

  let todo = {
    title,
    user,
    description,
    dueDate,
    option,
  }

  let result;

  if(id) {
    result = await List.findByIdAndUpdate( id, todo, { new: true, upsert: true } )
  } else {
    result = await List.create(todo)
  }

  return { type: true, result: result }
}

//Get
export const getLists = async ( userId?: string ) => {
  const result = await List.find({ user: userId })

  return { type: true, result: result }
}

//Delete
export const deleteList = async ( id :string) => {
  const result = await List.findByIdAndDelete( id )
  
  return { type: true, result: result }
}

//Update
export const updateList = 
async (
  body: { 
    title?: string; 
    description?: string; 
    dueDate?: Date; 
    option?: string; 
    user_id?: string; 
    status?: string 
  }, 
  params: { 
    id?: string 
  }
) => {
  const { id } = params;
  const { 
    title, 
    description, 
    dueDate, 
    option, 
    user_id, 
    status 
  } = body;

  const result = await List.findByIdAndUpdate(
    id, 
    { 
      $set: { 
        title, 
        description, 
        dueDate, 
        option, 
        user: user_id, 
        status 
      }
    }, 
    { 
      returnDocument: 'after' 
    }
  )

  return { type: true, result: result }
}

//Find
export const findList = 
async ( 
  body: { 
    key: string; 
    value: string 
  },
  userId ?: string
) => {
  const { key, value } = body;

  let result;
  if(value !== "") {
    result = await List.find({
      user: userId,
      [key]: typeof value === "string" 
      ? { $regex: value, $options: 'i' } 
      : value
    })
  } else {
    result = await List.find({})
  }

  return { type: true, result: result }
}

//Delete Multiple
export const deleteMultipleLists = 
async ( 
  body: { 
    ids: string[] 
  }
) => {
  const { ids } = body;
  await List.deleteMany( 
    { 
      _id: { 
        $in: ids 
      } 
    } 
  )
  
  return { type: true, result: ids }
}

// Modify Multiple Status
export const modifyMultipleListsStatus = 
async (
  body: { 
    ids: string[], 
    status: string 
  }
) => {
  const { ids, status } = body;
  await List.updateMany(
    { 
      _id: { 
        $in: ids 
      }
    }, 
    { 
      $set: { 
        status: status
      }
    }
  )

  return { 
    type: true, 
    result: { 
      ids: ids, 
      status: status
    } 
  }
}
