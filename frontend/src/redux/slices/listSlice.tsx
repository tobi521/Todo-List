import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ListState {
  lists: Array<any>
}

const initialState: ListState = {
  lists: []
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<any>) => {
      state.lists.push(action.payload);
    },
    getLists: (state, action: PayloadAction<Array<any>>) => {
      state.lists = action.payload;
    },
    deleteList: (state, action: PayloadAction<any>) => {
      state.lists = state.lists
      .filter((list: any) => list._id !== action.payload._id);
    },
    updateList: (state, action: PayloadAction<any>) => {
      state.lists = state.lists
      .map((list: any) => 
        list._id === action.payload._id 
        ? action.payload 
        : list);
    },
    findList: (state, action: PayloadAction<any>) => {
      state.lists = action.payload;
    },
    deleteMultipleLists: (state, action: PayloadAction<Array<any>>) => {
      state.lists = state.lists
      .filter((list: any) => !action.payload.includes(list._id));
    },
    updateMultipleListsStatus: (state, action: PayloadAction<{ids: Array<any>, status: String}>) => {
      state.lists = state.lists
      .map((list: any) => 
        action.payload.ids.includes(list._id) 
        ? {...list, status: action.payload.status} 
        : list
      );
    }
  }
})

export const { addList, getLists, deleteList, updateList, findList, deleteMultipleLists, updateMultipleListsStatus } = listSlice.actions

export default listSlice.reducer
