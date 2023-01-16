import React, {useEffect, useState} from 'react'
import { Post as IPost} from '../../pages/Home';
import '../../styles/showpost.css';
import { auth, db } from '../../config/firebase';
import { addDoc, query, where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props  {
    post: IPost
}

interface Like {
    userId: string;
}

export const ShowPost = (props: Props) => {
    const { post } = props;

    const [likes, setLikes] = useState<Like[] | null>(null)

    const [user] = useAuthState(auth);

    const likesRef = collection(db, 'likes');

    const likesDoc = query(likesRef, where('postId', "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId})));
    };

    const addLike = async () => {

        await addDoc(likesRef, { userId: user?.uid, postId: post?.id  }) 

        if(user) {

        setLikes((prev) => prev ? [...prev, {userId: user?.uid}] : [{userId: user?.uid}])
    }
}

    useEffect(() => {
      getLikes();

    }, [])
    
    const userLiked = likes?.find((like) => like.userId === user?.uid)

  return (
    <div className='box'>{' '}
    <div className='title'>
        <h1 className='titleText'>{post.title}</h1>
    </div>
    <div className='postBox'>
        {post.description}
    </div>
    <div><h2 className='username'>Posted by @{post.username}</h2></div>
    <div className='postFooter'><button onClick={() => {addLike()}}> {userLiked ? <>&#128078;</> : <>&#128077;</>} </button></div>
    {likes?.length && <p>Likes: {likes?.length}</p>}
    </div>
  )
}
