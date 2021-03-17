import { createSlice } from "@reduxjs/toolkit";

const initialState = { attractions: [], restaurants: [], hotels: [] };

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    fetchedAttractions: {
      reducer(state, action) {
        state["attractions"].splice(0, 1, action.payload);
      },
    },
    fetchedRestaurants: {
      reducer(state, action) {
        state["restaurants"].splice(0, 1, action.payload);
      },
    },
    fetchedHotels: {
      reducer(state, action) {
        state["hotels"].splice(0, 1, action.payload);
      },
    },
  },
});

export const {
  fetchedAttractions,
  fetchedRestaurants,
  fetchedHotels,
} = addressSlice.actions;

export default addressSlice.reducer;

export const selectAddresses = (state) => state.addresses;
