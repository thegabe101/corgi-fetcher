import React, {useEffect, useState} from 'react'
import { Post as IPost} from '../../pages/Home';
import '../../styles/showpost.css';
import { auth, db } from '../../config/firebase';
import { addDoc, query, where, deleteDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc } from 'firebase/firestore';

interface Props  {
    post: IPost
}

interface Like {
    likeId: string,
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
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
    };

    const addLike = async () => {
            try {
        const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post?.id  }) 

        if(user) {

        setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}])
        }
            } catch (err) {
                console.log(err);
    }
};

    const removeLike = async () => {
        try {
        const likeQuery = query(likesRef, where ('postId', '==', post.id), where ('userId', '==', user?.uid))
        
        const likeToDeleteData = await getDocs(likeQuery);
        
        const likeToDelete = doc(db, 'likes', likeToDeleteData.docs[0].id);

        await deleteDoc(likeToDelete) ;

        if (user) {
            setLikes((prev) => 
                prev && prev.filter((e) => e.likeId !== likeToDeleteData.docs[0].id)
            )
        }} catch (err){
            console.log(err)
        }

};

    useEffect(() => {
      getLikes();

    }, [])
    
    const userLiked = likes?.find((like) => like.userId === user?.uid)


    
  return (
    <div className='box'>{' '}
    <div className='title'>
        {user && <h1 className='titleText'>{post.title}</h1>}
    </div>
    <div className='postBox'>
        {user && <p>{post.description}</p>}
    </div>
    <div>{user && <h2 className='username'>Posted by @{post.username}</h2>}</div>
    <div className='postFooter'>{user && <button onClick={userLiked ? removeLike: addLike}> {userLiked ? <>&#128078;</> : <>&#128077;</>} </button>}</div>
    {user && <>{likes?.length && <p>Likes: {user && <>{likes?.length}</>}</p>}</>}
    </div>
  )
}
