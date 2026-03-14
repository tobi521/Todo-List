import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authSlice } from "./authSlice";

interface ListState {
  lists: Array<any>
}

const initialState: ListState = {
  lists: []
}

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<any>) => {
      state.lists.push(action.payload);
    },
    getLists: (state, action: PayloadAction<Array<any>>) => {
      state.lists = action.payload;
    },
    deleteList: (state, action: PayloadAction<any>) => {
      state.lists = state.lists.filter((list: any) => list._id !== action.payload);
    },
    updateList: (state, action: PayloadAction<any>) => {
      state.lists = state.lists.map((list: any) => list._id === action.payload._id ? action.payload : list);
    }
  }
})

export const { addList, getLists, deleteList, updateList } = listSlice.actions

export default listSlice.reducer
