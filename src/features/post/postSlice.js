import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns'

const initialState = {
  loading: false,
  posts:[],
  error: null
}



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() =>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  return response.data
  
})
export const createPost = createAsyncThunk('posts/createPost', async(newPost,{ rejectWithValue })=>{
   try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
    return res.data
   } catch (error) {
    return rejectWithValue(error.res?.data)
   }
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    addReaction: (state, action) =>{
    const { postId, reaction } = action.payload
    const existingPost = state.posts.find(post => post.id === postId)
    if(existingPost){
      existingPost.reactions[reaction]++
    }
    }
  },
  extraReducers: (bulder) =>{
   bulder
    .addCase(fetchPosts.pending, (state)=>{
      state.loading = true
    })
    .addCase(fetchPosts.fulfilled, (state, action)=>{
      state.loading = false
      let min = 1;
      const loadedPosts = action.payload.map(post =>{
        post.date = sub(new Date(), { minutes: min++}).toISOString()
        post.reactions = {
          like: 0,
          love: 0,
          happy: 0,
          angry: 0,
        }

        return post
      })

      state.posts = state.posts.concat(loadedPosts)

    })
    .addCase(fetchPosts.rejected, (state,action)=>{
      state.loading = false
      state.error = action.error.message
    })

    //Create newPost
    bulder
     .addCase(createPost.pending,(state)=>{
       state.loading = true
     })
     .addCase(createPost.fulfilled,(state,action)=>{
      state.loading =false
      action.payload.userId = Number(action.payload.userId)
      action.payload.date = new Date().toISOString()
      state.posts.push(action.payload)
     })
     .addCase(createPost.rejected,(state, action)=>{
      state.loading = false
      state.error = action.error.message
     })
  }
})

export const { addReaction } = postSlice.actions

export default postSlice.reducer