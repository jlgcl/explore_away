import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "../Routes/Search/searchSlice";
import addressReducer from "../Routes/Search/SearchMap/addressSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
    addresses: addressReducer,
  },
});
