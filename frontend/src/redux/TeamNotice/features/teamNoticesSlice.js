import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const teamNoticesSlice = createSlice({
  name: "teamNotices",
  initialState,
  reducers: {
    setTeamNotices: (state, action) => {
      state.data = [...action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTeamNotices, setLoading, setError } =
  teamNoticesSlice.actions;
export default teamNoticesSlice.reducer;
