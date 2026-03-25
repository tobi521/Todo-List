import axios from 'axios'
import { 
  addList, 
  getLists, 
  deleteList, 
  updateList, 
  findList, 
  deleteMultipleLists, 
  updateMultipleListsStatus 
} from '../slices/listSlice'
import { clearErrors, setErrors } from '../slices/errorSlice'

import { notify, messages } from '../../utils'

const { SERVER_DISCONNECTED, NOT_ADMIN } = messages

export const createList = async (list: object, dispatch: Function) => {
  try {
    dispatch(clearErrors({}))

    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list`, list)

    if(res.data.type) {
      dispatch(addList(res.data.result))
      notify({ type: "success", message: "Todo added successfully" })
    }
  } catch (err: any) {
    if(!err.response) {
      notify({ type: 'error', message: SERVER_DISCONNECTED })
    } else if(err.response.status === 400) {
      dispatch(setErrors(err.response.data.result))
    }
  }
}

export const fetchLists = async (dispatch: Function) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list`)
    if(res.data.type) {
      dispatch(getLists(res.data.result))
      notify({ type: 'success', message: 'Todos fetched successfully' })
    }
  } catch (err: any) {
    if(!err.response) {
      notify({ type: 'error', message: SERVER_DISCONNECTED })
    }
  }
}

export const removeList = async (id: String, dispatch: Function) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/${id}`)

    if(res.data.type) {
      dispatch(deleteList(res.data.result))   
      notify({ type: 'success', message: 'Todo deleted successfully' })
    }
  } catch(err: any) {
    if(!err.response) {
      notify({ type: 'error', message: SERVER_DISCONNECTED })
    }
  }
}

export const modifyList = async (id: String, data: any, dispatch: Function ) => {
  try {
    dispatch(clearErrors({}))
    
    const res = await axios.put(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/${id}`, data)

    if(res.data.type) {
      dispatch(updateList(res.data.result))
      notify({ type: 'success', message: 'Todo updated successfully' })
    } else {
      if(res.status === 400) {
        dispatch(setErrors(res.data.result))
      }
    }
  } catch(err: any) {
    if(!err.response) {
      notify({ type: 'error', message: SERVER_DISCONNECTED })
    } else if(err.response.status === 400) {
      dispatch(setErrors(err.response.data.result))
    }
  }
}

export const searchList = async (query: any, dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/search`, query)

    if(res.data.type) {
      dispatch(findList(res.data.result))
    }
  } catch(err: any) {
    if(!err.response) {
      notify({ type: 'error', message: SERVER_DISCONNECTED })
    }
  }
}

export const removeMultipleLists = async (ids: String[], dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/delete_many`, {ids})

    if(res.data.type) {
      dispatch(deleteMultipleLists(res.data.result))
      notify({ type: 'success', message: 'Todos deleted successfully' })
    }
  } catch(err: any) {
    if(!err.response) {
      notify({ type: 'error', message: SERVER_DISCONNECTED })
    } else if(err.response.status === 403) {
      notify({ type: 'error', message: NOT_ADMIN })
    }
  }
}

export const modifyMultipleListsStatus = async (ids: String[], status: any, dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/update_many`, {ids, status})

    if(res.data.type) {
      dispatch(updateMultipleListsStatus(res.data.result))
      notify({ type: 'success', message: 'Todos updated successfully' })
    }
  } catch(err: any) {
    if(!err.response) {
      notify({ type: 'error', message: SERVER_DISCONNECTED })
    } else if(err.response.status === 403) {
      notify({ type: 'error', message: NOT_ADMIN })
    }
  }
}