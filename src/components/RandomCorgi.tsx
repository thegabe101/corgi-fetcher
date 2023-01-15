import { useContext } from "react";
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

export const RandomCorgi = () => {
    const {data, isLoading, refetch } = useQuery(['corgi'], () => {
        return axios.get('https://dog.ceo/api/breeds/image/random').then((res) => 
            res.data.message)
    });

if (isLoading) {
    return <h1>Loading corgi!</h1>
}

return (
    <div> 
        {data?.message}
    </div>
);

};