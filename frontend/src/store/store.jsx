import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducer/userReducer";

const store =  configureStore({
    reducer:{
        auth: userReducer,
    }
})


export default store;