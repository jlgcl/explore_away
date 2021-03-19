import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: {
    attractions: [],
    restaurants: [],
    hotels: [],
  },
  coordinates: { attractions: [], restaurants: [], hotels: [] },
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    fetchedAttractions: {
      reducer(state, action) {
        state["addresses"]["attractions"].splice(0, 1, action.payload);
      },
    },
    fetchedRestaurants: {
      reducer(state, action) {
        state["addresses"]["restaurants"].splice(0, 1, action.payload);
      },
    },
    fetchedHotels: {
      reducer(state, action) {
        state["addresses"]["hotels"].splice(0, 1, action.payload);
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

export const selectAddresses = (state) => state.addresses["addresses"];
