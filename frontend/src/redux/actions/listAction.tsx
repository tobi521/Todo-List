import { addList, getLists, deleteList, updateList } from "../slices/listSlice"
import axios from "axios"

export const createList = async (list: object, dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/add_list`, list)

    if(res.data.type) {
      dispatch(addList(res.data.result))
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchLists = async (dispatch: Function) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/list/get_lists`)

    if(res.data.type) {
      dispatch(getLists(res.data.result))
    }
  } catch (err) {
    console.log(err)
  }
}
