import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const socialMediaSlice = createSlice({
  name: "selectedAddress",
  initialState,
  reducers: {
    addressSelected(state, action) {
      state.splice(0, 1, action.payload);
    },
  },
});

export const { addressSelected } = socialMediaSlice.actions;

export default socialMediaSlice.reducer;

export const selectedAddress = (state) => state.selectedAddress;
