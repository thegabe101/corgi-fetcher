import React, {useState, useEffect} from 'react'
import {getDoc, getDocs, collection} from 'firebase/firestore';
import {db} from '../config/firebase'
import { ShowPost } from '../components/show-post/ShowPost';
import '../styles/home.css';

export interface Post  {
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string
}

export const Home = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);

    //don't need typical fetch here because firebase is handling
    const postsRef = collection(db, 'posts')

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        console.log(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));

        setPostsList(data.docs.map((doc)=> ({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(() => {
      getPosts();
    }, [])
    

  return (
    <div className='container'>{postsList?.map((e) => <ShowPost  post={e}/>)}</div>
  )
}
