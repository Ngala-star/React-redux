import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { createPost } from './postSlice'

const PostForm = () => {
  const [post, setPost] = useState({
    title:'',
    body:'',
    userId:''
  })
 const dispatch = useDispatch()
  const {users} = useSelector(state=> state.users)
 

  const handleOnChange =(e)=>{
    const {name, value } = e.target;
    setPost(prevState =>({...prevState,[name]: value}))
  }

  const userOptions = users.map(user =>(
    <option key={user.id} value={user.id} >
      {user.name}
    </option>
  ))

  const handleSubmit =(e) =>{
    e.preventDefault();

    const newPost = {
      title: post.title,
      body: post.body,
      userId: post.userId,
      reactions:{
        like: 0,
        love: 0,
        happy: 0,
        angry: 0,
      }
    }
    if(newPost.title && newPost.body && newPost.userId){
      dispatch(createPost(newPost))
  
      setPost(prevState => ({...prevState, title:'',body:'', userId:''}))

    } else{
      alert('Please fill are required fields')
      return
    }

  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="form-lable">Title</label>
          <input
            type="text"
            id='title'
            name='title'
            required
            className="form-control"
            value={post.title}
            onChange={handleOnChange}
          />
        </div>


        <div>
          <label htmlFor="userId" className="form-label">Author</label>
          <select
            name="userId"
            id="userId"
            required
            value={post.userId}
            onChange={handleOnChange}
            className="form-select"
          >
            <option value=""></option>
              {userOptions}
          </select>
        </div>

        <div>
          <label htmlFor="body" className="form-lable">Content</label>
          <textarea
            type="text"
            id='body'
            name='body'
            required
            className="form-control"
            value={post.body}
            onChange={handleOnChange}
          />
        </div>
        <div className='text-center mt-4'>
          <button type='submit' className='btn btn-success px-5'>Submit</button>
        </div>
        
      </form>
    </div>
  )
}

export default PostForm