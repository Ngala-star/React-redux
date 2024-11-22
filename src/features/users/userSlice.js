import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  users:[],
  loading: false,
  error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers',async(__, {rejectWithValue})=>{
  try {
     const response = await axios.get('https://jsonplaceholder.typicode.com/users')
     return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

const userSlice = createSlice({
  name:'users',
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
     .addCase(fetchUsers.pending, (state)=>{
      state.loading = true;
     })
     .addCase(fetchUsers.fulfilled,(state,action)=>{
      state.loading = false
      state.users = action.payload
     })
     .addCase(fetchUsers.rejected,(state, action)=>{
      state.loading = false
      state.error = action.payload || 'Failled to load the date!'
     })
  }
})



export default userSlice.reducer
