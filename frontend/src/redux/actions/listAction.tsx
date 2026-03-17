import { clearErrors, setErrors } from "../slices/errorSlice"
import { addList, getLists, deleteList, updateList, findList, deleteMultipleLists, updateMultipleListsStatus } from "../slices/listSlice"
import axios from "axios"

export const createList = async (list: object, dispatch: Function) => {
  try {
    dispatch(clearErrors({}))

    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/add_list`, list)

    if(res.data.type) {
      dispatch(addList(res.data.result))
    }
  } catch (err: any) {
    dispatch(setErrors(err.response.data))
  }
}

export const fetchLists = async (id: String, dispatch: Function) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/get_lists/${id}`)

    if(res.data.type) {
      dispatch(getLists(res.data.result))
    }
  } catch (err) {

  }
}

export const removeList = async (id: String, dispatch: Function) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/delete_list/${id}`)

    if(res.data.type) {
      dispatch(deleteList(res.data.result))
    }
  } catch(err) {

  }
}

export const modifyList = async (id: String, data: any, dispatch: Function ) => {
  try {
    dispatch(clearErrors({}))
    
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/update_list/${id}`, data)

    if(res.data.type) {
      dispatch(updateList(res.data.result))
    }
  } catch(err) {
  }
}

export const searchList = async (query: any, dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/find_list`, query)

    if(res.data.type) {
      dispatch(findList(res.data.result))
    }
  } catch(err) {
    
  }
}

export const removeMultipleLists = async (ids: String[], dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/delete_multiple_lists`, {ids})

    if(res.data.type) {
      dispatch(deleteMultipleLists(res.data.result))
    }
  } catch(err) {
    console.log(err)
  }
}

export const modifyMultipleListsStatus = async (ids: String[], status: any, dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/modify_multiple_lists_status`, {ids, status})

    if(res.data.type) {
      dispatch(updateMultipleListsStatus(res.data.result))
    }
  } catch(err) {
    console.log(err)
  }
}