import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from './../src/config.js';

function useGetCurrentUser() {

    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current` ,
                {withCredentials:true}
            )
            console.log(result);
            } catch (error) {
                console.log(error);
            }  
        }
        fetchUser()
    } ,[])
}

export default useGetCurrentUser