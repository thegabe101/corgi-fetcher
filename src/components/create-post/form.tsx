import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { db } from '../../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { storage } from '../../config/firebase';
import {ref, uploadBytes} from 'firebase/storage';
import { uuidv4 } from '@firebase/util';


interface CreateFormData {
    title: string;
    description: string;
    photo: File;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const [imageUpload, setImageUpload] = useState<CreateFormData | null>(null);

    const schema = yup.object().shape({
        title: yup.string().required('Post must contain title'),
        description: yup.string().required('Post must contain a body'),
        photo: yup.mixed()
    })

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()

    const postsRef = collection(db, 'posts')

    const submitPost = async (data: CreateFormData) => {
        console.log(data);
        await addDoc(postsRef, {
            //data fields can also be defined using spread operator 
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
            photo: data.photo
        });

        navigate('/');
    }


    const uploadImage = () => {
        if (imageUpload == null) return;

        const imageRef = ref(storage, `images/${imageUpload + uuidv4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert('Image uploading successfully.')
        });
    }

    return(
        <form onSubmit={handleSubmit(submitPost)}>
            <input placeholder="Title of post" {...register('title')}/>
            <p style={{color: 'red'}}>{errors.title?.message}</p>
            <textarea placeholder='Post body' {...register('description')}></textarea>
            <p style={{color: 'red'}}>{errors.description?.message}</p>
            <input type='file' onChange={(event) => {setImageUpload(event.target.files[0])}}/>
            <button onClick={uploadImage}>Upload my corgi!</button>
            <button type='submit'>Create post</button>
        </form>
    )
}