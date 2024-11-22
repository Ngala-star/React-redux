import { parseISO, formatDistanceToNow } from 'date-fns'


const PostTime = ({ timestamp }) => {
 let timeAgo;
  if(timestamp){
   const updateAt = parseISO(timestamp)
   timeAgo = `${formatDistanceToNow(updateAt)}`
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo} ago</i>
    </span>
  )
}

export default PostTime