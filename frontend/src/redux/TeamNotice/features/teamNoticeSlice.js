import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const teamNoticeSlice = createSlice({
  name: "teamNotices",
  initialState,
  reducers: {
    setTeamNotice: (state, action) => {},
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTeamNotice, setLoading, setError } = teamNoticeSlice.actions;
export default teamNoticeSlice.reducer;
