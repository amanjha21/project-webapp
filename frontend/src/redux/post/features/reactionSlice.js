import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const reactionSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    setReactions: (state, action) => {
      state.data = [
        ...state.data,
        { reactions: action.payload.data, postId: action.payload.id },
      ];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setReactions, setError, setLoading } = reactionSlice.actions;
export default reactionSlice.reducer;
