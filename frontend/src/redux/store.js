import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post/features/postSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
