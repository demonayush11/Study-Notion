import {combineReducers} from "@reduxjs/toolkit";
import { root } from "postcss";
import authReducer from "../slices/authSlice"
const rootReducer =combineReducers({
      auth:authReducer,
})
export default rootReducer;