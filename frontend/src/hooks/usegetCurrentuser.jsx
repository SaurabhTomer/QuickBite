import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function usegetCurrentuser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/CurrentUser`, {
          withCredentials: true,
        });
        //set user data in redux store
        dispatch(setUserData(result.data))
        // console.log(result);
      } catch (error) {
        console.log(error)
      }
    };
    fetchUser()
  }, []);
}

export default usegetCurrentuser;
