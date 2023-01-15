import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { db } from '../../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';


interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required('Post must contain title'),
        description: yup.string().required('Post must contain a body')
    })

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, 'posts')

    const submitPost = async (data: CreateFormData) => {
        console.log(data);
        await addDoc(postsRef, {
            //data fields can also be defined using spread operator 
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid
        })
    }

    return(
        <form onSubmit={handleSubmit(submitPost)}>
            <input placeholder="Title of post" {...register('title')}/>
            <p style={{color: 'red'}}>{errors.title?.message}</p>
            <textarea placeholder='Post body' {...register('description')}></textarea>
            <p style={{color: 'red'}}>{errors.description?.message}</p>
            <button type='submit'>Create post</button>
        </form>
    )
}