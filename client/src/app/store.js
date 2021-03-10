import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "../Routes/Search/searchSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
  },
});
