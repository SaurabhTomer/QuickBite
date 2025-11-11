import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

function useGetMyShop() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/getmyshop`, {
          withCredentials: true,
        });
        // set shop data in redux store
        dispatch(setMyShopData(result.data?.shop ?? null))
        
      } catch (error) {
        console.log(error);
        dispatch(setMyShopData(null));
      }
    };
    fetchShop()
  }, []);
}

export default useGetMyShop;
