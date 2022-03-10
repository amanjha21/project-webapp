import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUserPosts: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserPosts, setLoading, setError } = userPostsSlice.actions;
export default userPostsSlice.reducer;
