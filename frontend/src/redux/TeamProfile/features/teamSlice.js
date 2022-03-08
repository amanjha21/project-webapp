import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const teamSlice = createSlice({
  name: "teamProfile",
  initialState,
  reducers: {
    setTeam: (state, action) => {
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

export const { setTeam, setLoading, setError } = teamSlice.actions;
export default teamSlice.reducer;
