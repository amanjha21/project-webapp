import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const noticeSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setNotices: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeNotices: (state, action) => {
      state.data = [];
    },
  },
});

export const { setNotices, setError, setLoading, removeNotices } =
  noticeSlice.actions;
export default noticeSlice.reducer;
