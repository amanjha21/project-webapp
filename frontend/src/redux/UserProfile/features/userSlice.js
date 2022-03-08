import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
