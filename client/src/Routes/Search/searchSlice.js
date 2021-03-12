import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchSubmitted: {
      reducer(state, action) {
        state.splice(0, 1, action.payload);
      },
    },
  },
});

export const { searchSubmitted } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearch = (state) => state.search[0];
