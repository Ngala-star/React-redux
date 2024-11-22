import { useDispatch } from "react-redux"
import { addReaction } from "./postSlice"

const reactionEmojis = {
  like:'👍',
  love:'💗',
  happy:'😂',
  angry:'😞'
}



const PostReactions = ({ post }) => {

 const dispatch = useDispatch()
 const buttons = Object.entries(reactionEmojis).map(([name, emoji])=>{
  return(
    <button
    key={name}
    className="reaction-btn"
    onClick={()=>{
      dispatch(addReaction({postId: post.id, reaction: name}))
    }}
    >
     {emoji} {post.reactions[name]}
    </button>
  )
 })

  return (
    <div>{buttons}</div>
  )
}

export default PostReactions