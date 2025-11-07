import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    // used to define particular thing inital state
    initialState:{
        userData:null,

    },
    //reducres used to set initialState data
    reducers:{
        setUserData:(state , action) => {
            state.userData = action.payload
        }
    }
})

export const {setUserData} = userSlice.actions;
export default userSlice.reducer