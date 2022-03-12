import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const teamMemberSlice = createSlice({
  name: "teamMembers",
  initialState,
  reducers: {
    setTeamMember: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error;
    },
  },
});

export const { setTeamMember, setLoading, setError } = teamMemberSlice.actions;
export default teamMemberSlice.reducer;
