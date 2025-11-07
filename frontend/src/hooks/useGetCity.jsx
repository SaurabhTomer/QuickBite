import React, { useEffect } from "react";
import axios from "axios";
import { setCity } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


function useGetCity() {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEO_API_KEY;
  const {userData} = useSelector( (state => state.user))

  // fetch loaction
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      // console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );
      // console.log(result)
      const city = result?.data?.results[0]?.city;
    //   console.log(city);

   //set in redux 
    dispatch(setCity(city))
    });
    
  } , [userData]);
}

export default useGetCity;
