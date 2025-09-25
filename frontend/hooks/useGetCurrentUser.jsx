import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../src/config.js';
import { setUserData } from '../src/redux/user.slice.js';

function useGetCurrentUser() {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current` ,
                {withCredentials:true}
            )
            dispatch(setUserData(result.data))
            // console.log(result);
            } catch (error) {
                console.log(error);
            }  
        }
        fetchUser()
    } ,[])
}

export default useGetCurrentUser