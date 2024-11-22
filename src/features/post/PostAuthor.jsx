import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../users/userSlice'


const PostAuthor = ({ userId }) => {

  const { users  } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch])

  const author = users.find(user => user.id === userId)
 
  return (
    <span>by { author? author.name : 'Unknown author' }</span>
  )
}

export default PostAuthor