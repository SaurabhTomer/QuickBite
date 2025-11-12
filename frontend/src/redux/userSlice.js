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
        cartItems:[],
        totalAmount : 0,

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

            //change total amount
            state.totalAmount = state.cartItems.reduce( (sum , i ) => sum + i.price * i.quantity, 0)
        },
        updateQuantity:(state , action) => {
            const {id , quantity} = action.payload
            const item = state.cartItems.find( i => i.id == id)
            if(item){
                item.quantity  = quantity
            }
              //change total amount
            state.totalAmount = state.cartItems.reduce( (sum , i ) => sum + i.price * i.quantity, 0)
        },
        removeCartItem:(state , action) => {
            state.cartItems = state.cartItems.filter(i => i.id  !== action.payload)
              //change total amount
            state.totalAmount = state.cartItems.reduce( (sum , i ) => sum + i.price * i.quantity, 0)
        },
        
       
    }
})

export const {setUserData , setCurrentCity , setCurrentState , setCurrentAddress , setShopInMyCity ,setItemsInMyCity , updateQuantity , removeCartItem } = userSlice.actions;
export default userSlice.reducer