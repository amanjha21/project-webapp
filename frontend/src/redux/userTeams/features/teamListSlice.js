import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  errors: "",
};

export const teamListSlice = createSlice({
  name: "teamNames",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.data = { ...state.data, ...action.payload.data };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTeams, setError, setLoading } = teamListSlice;
export default teamListSlice.reducer;
