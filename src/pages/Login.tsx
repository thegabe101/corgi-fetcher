import React from 'react';
import {auth, provider} from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import Button from 'react-bootstrap/esm/Button';
import google from '../assets/images/google.jpg'
import '../styles/login.css'
import {useNavigate} from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider) ;
        console.log(result);
        navigate('/')
    }

  return (
    <div>
    <Button onClick={signInWithGoogle} variant="success"><img className='google' src={google}></img>Sign in with Google</Button>{' '}</div>
  )
}
