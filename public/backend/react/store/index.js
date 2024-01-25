import userSlice from "../views/pages/users/config/store";


import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        
        
    }
});


export default store;