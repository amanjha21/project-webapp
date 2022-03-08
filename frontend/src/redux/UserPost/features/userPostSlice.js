import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: flase,
  data: [],
  error: "",
};

export const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUserPost: (state, action) => {},
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserPost, setLoading, setError } = userPostSlice.actions;
export default userPostSlice.reducer;
