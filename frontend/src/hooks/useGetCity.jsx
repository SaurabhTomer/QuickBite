import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setUserData,
} from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";

function useGetCity() {
  //  Hook from Redux to send actions (used to update data in Redux store)
  const dispatch = useDispatch();

  //  Hook from Redux to access data (used to read data from Redux store)
  const { userData } = useSelector((state) => state.user);

  //  Your Geo API key stored in .env file
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  //  useEffect runs when the component mounts or when userData changes
  useEffect(() => {
    //  Ask user for location permission and get their current coordinates
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      //  Save the user's current latitude & longitude to Redux (mapSlice)
      dispatch(setLocation({ lat: latitude, lon: longitude }));

      //  Call Geoapify Reverse Geocoding API to get city, state, address
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );

      //  Extract useful data from the API response
      const city =
        result?.data?.results[0].city || result?.data?.results[0].county;
      const state = result?.data?.results[0].state;
      const address =
        result?.data?.results[0].address_line2 ||
        result?.data?.results[0].address_line1;

      //  Update Redux store with the fetched location details

      dispatch(setCurrentCity(city));          // store user's current city
      dispatch(setCurrentState(state));        // store user's current state
      dispatch(setCurrentAddress(address));    // store user's address
      dispatch(setAddress(address));           // also update mapSlice address
      
    });
  }, [userData]); //  Runs again if userData changes (e.g., user logs in/out)
}

export default useGetCity;
