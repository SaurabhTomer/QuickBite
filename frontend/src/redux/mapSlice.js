import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
    name:"user",
    // used to define particular thing inital state
    initialState:{
        location:{
            lat:null,
            lon:null
        },
        address:null,
     

    },
    //reducres used to set initialState data
    reducers:{
        setLocation:(state , action) => {
            const {lat , lon} = action.payload
            state.location.lat = lat
            state.location.lon = lon
        },
        setAddress:(state , action) => {
            state.address = action.payload
        }
       
    }
})

export const {setLocation ,setAddress  } = mapSlice.actions;
export default mapSlice.reducer