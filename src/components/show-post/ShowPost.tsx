import React from 'react'
import { Post as IPost} from '../../pages/Home'

interface Props  {
    post: IPost
}

export const ShowPost = (props: Props) => {
    const { post } = props;

  return (
    <div>{' '}
    <div className='title'>
        <h1>{post.title}</h1>
    </div>
    <div>
        {post.description}
    </div>
    <div><h2>Posted by @{post.username}</h2></div>
    </div>
  )
}
