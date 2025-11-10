import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name:"owner",
    // used to define particular thing inital state
    initialState:{
        myShopData:null,
    },
    //reducres used to set initialState data
    reducers:{
        setMyShopData:(state , action) => {
            state.userData = action.payload
        },
    }
})

export const {setMyShopData } = ownerSlice.actions;
export default ownerSlice.reducer