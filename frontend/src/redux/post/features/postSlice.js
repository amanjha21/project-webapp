import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removePosts: (state, action) => {
      state.data = [];
    },
  },
});

export const { setPosts, setError, setLoading, removePosts } =
  postSlice.actions;
export default postSlice.reducer;
