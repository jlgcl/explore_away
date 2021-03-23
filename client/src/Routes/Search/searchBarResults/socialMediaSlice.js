import { createSlice } from "@reduxjs/toolkit";

const initialState = { address: [], clickEvent: false };

const socialMediaSlice = createSlice({
  name: "selectedAddress",
  initialState,
  reducers: {
    addressSelected(state, action) {
      state.address.splice(0, 1, action.payload);
    },
    addressClicked(state, action) {
      state.clickEvent = action.payload;
    },
  },
});

export const { addressSelected, addressClicked } = socialMediaSlice.actions;

export default socialMediaSlice.reducer;

export const addressName = (state) => state.socialMedia.address[0];
export const addressClickStatus = (state) => state.socialMedia.clickEvent;
