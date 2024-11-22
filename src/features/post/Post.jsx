import { useEffect } from "react";
import './post.scss'
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postSlice";
import PostTime from "./PostTime";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import PostForm from "./PostForm";



const Post = () => {
  const dispatch = useDispatch()
  const { posts, loading, error }  = useSelector((state)=> state.posts)

  
  
  useEffect(()=>{
    dispatch(fetchPosts())
  },[dispatch])

  const oderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))
 
  return (
    <div className="post">
      <div className="mb-5">
        <PostForm/>
      </div>
      
      {
        loading && (<p className="loading">loading...</p>)
      }
      {
        error && (<p className="error">Error occured; {error}</p>)
      }
      {
        
        oderedPosts.map( post => (
          <div key={post.id} className="post-content">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-body">{post.body}</p>
          <p>
            <PostAuthor userId={post.userId}/>
            <PostTime timestamp ={post.date} />
          </p>
          <PostReactions post ={post} />
          </div>
        ))
      }
    </div>
  )
}

export default Post