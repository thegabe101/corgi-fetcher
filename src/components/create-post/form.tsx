import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { db } from '../../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { storage } from '../../config/firebase';
import {ref, uploadBytes} from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
// import { app } from '../../config/firebase';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';
// import e from 'express';

// export const storage = firebase.storage()


interface CreateFormData {
    title: string;
    description: string;
    // photo: File;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    // const [file, setFile] = useState<CreateFormData | null>(null);
    // const [url, setURL] = useState('');
    // const [imageUpload, setImageUpload] = useState<CreateFormData | null>(null);

    const schema = yup.object().shape({
        title: yup.string().required('Post must contain title'),
        description: yup.string().required('Post must contain a body'),
        // photo: yup.mixed()
    })

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()

    const postsRef = collection(db, 'posts')

    const submitPost = async (data: CreateFormData) => {
        // if (!data.photo) return;
        // console.log(data);
        // const path = `/images/${file}`;
        // const ref = storage.ref(path);
        // if (!file) return;
        // await ref.put(file);
        // const url = await ref.getDownloadURL();
        // setURL(url);
        // setFile(null);
        await addDoc(postsRef, {
            //data fields can also be defined using spread operator 
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
            // photo: data.photo
        });

        navigate('/');
    }

    // function handleChange(e) {
    //     if (e.target.files[0])
    //         setFile(e.target.files[0]);
    //   }


    // const uploadImage = () => {
    //     if (imageUpload == null) return;

    //     const imageRef = ref(storage, `images/${imageUpload.photo + uuidv4()}`);
    //     uploadBytes(imageRef, imageUpload.photo).then(() => {
    //         alert('Image uploading successfully.')
    //         console.log(`images/${imageUpload.photo + uuidv4()}`);
    //     });
    // }

    return(
        <form onSubmit={handleSubmit(submitPost)}>
            <input placeholder="Title of post" {...register('title')}/>
            <p style={{color: 'red'}}>{errors.title?.message}</p>
            <textarea placeholder='Post body' {...register('description')}></textarea>
            <p style={{color: 'red'}}>{errors.description?.message}</p>
            {/* <input {...register('photo')}  type='file' name= "picture"  onChange={(event) => {setImageUpload(event.target.files[0])}} />
            <button onClick={uploadImage}>Upload my corgi!</button> */}
            <button type='submit'>Create post</button>
        </form>
    )
}