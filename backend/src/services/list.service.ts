import List from "../models/list.model"
import validateAddListInput from "../validator/addList"

type ListProps = {
  title: string; 
  user: string; 
  description: string; 
  dueDate: Date; 
  option: string, 
  id: string,
  status: boolean
}

// Add
export const addList = 
async ( data: ListProps ) => {
  const { errors, isValid } = validateAddListInput(data)
  const { 
    title, 
    user, 
    description, 
    dueDate, 
    option, 
    id
  } = data

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
export const deleteList = async ( id :string ) => {
  const result = await List.findByIdAndDelete( id )
  
  return { type: true, result: result }
}

//Update
export const updateList = 
async (
  data: ListProps,
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
    user, 
    status 
  } = data;

  const result = await List.findByIdAndUpdate(
    id, 
    { 
      $set: { 
        title, 
        description, 
        dueDate, 
        option, 
        user: user, 
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
  data: { 
    key: string; 
    value: string 
  },
  userId ?: string
) => {
  const { key, value } = data;

  let result;
  if(value !== "") {
    result = await List.find({
      user: userId,
      [key]: typeof value === "string" ? { $regex: value, $options: 'i' } : value
    })
  } else {
    result = await List.find({})
  }

  return { type: true, result: result }
}

//Delete Multiple
export const deleteMultipleLists = 
async ( 
  data: { 
    ids: string[] 
  }
) => {
  const { ids } = data;
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
  data: { 
    ids: string[], 
    status: string 
  }
) => {
  const { ids, status } = data;
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
