import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    // used to define particular thing inital state
    initialState:{
        userData:null,
        currentCity:null,
        currentState:null,
        currentAddress:null,

    },
    //reducres used to set initialState data
    reducers:{
        setUserData:(state , action) => {
            state.userData = action.payload
        },
        setCity:(state , action) => {
            state.currentCity = action.payload
        },
        setState:(state , action) => {
            state.currentState = action.payload
        },
         setAddress:(state , action) => {
            state.currentAddress = action.payload
        },
       
    }
})

export const {setUserData , setCity , setState , setAddress} = userSlice.actions;
export default userSlice.reducer