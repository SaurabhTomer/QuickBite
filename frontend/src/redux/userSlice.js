import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    // used to define particular thing inital state
    initialState:{
        userData:null,
        currentCity:null,
        currentState:null,
        currentAddress:null,
        shopInMyCity:null,
        itemsInMyCity:null,
        //how cart item should stored
        cartItems:[]

    },
    //reducres used to set initialState data
    reducers:{
        setUserData:(state , action) => {
            state.userData = action.payload
        },
        setCurrentCity:(state , action) => {
            state.currentCity = action.payload
        },
        setCurrentState:(state , action) => {
            state.currentState = action.payload
        },
         setCurrentAddress:(state , action) => {
            state.currentAddress = action.payload
        },
        setShopInMyCity:(state , action) => {
            state.shopInMyCity=action.payload
        },
        setItemsInMyCity:(state , action) => {
            state.itemsInMyCity = action.payload
        },
        addToCart:(state , action) => {
            const cartItem = action.payload
            //if food is already exist in cart then we increase its quantity only we dont add thst food again
            const existingItem = state.cartItems.find( i => i.id == cartItem.id )
            if(existingItem){
                existingItem.quantity  = cartItem.quantity
            }
            //else we puch new food in cart
            else{
                state.cartItems.push(cartItem)
            }
        }
       
    }
})

export const {setUserData , setCurrentCity , setCurrentState , setCurrentAddress , setShopInMyCity ,setItemsInMyCity } = userSlice.actions;
export default userSlice.reducer