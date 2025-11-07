import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    // used to define particular thing inital state
    initialState:{
        userData:null,
        city:null,

    },
    //reducres used to set initialState data
    reducers:{
        setUserData:(state , action) => {
            state.userData = action.payload
        },
        setCity:(state , action) => {
            state.city = action.payload
        },
       
    }
})

export const {setUserData , setCity} = userSlice.actions;
export default userSlice.reducer