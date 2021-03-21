import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "../Routes/Search/searchSlice";
import addressReducer from "../Routes/Search/SearchMap/addressSlice";
import socialMediaReducer from "../Routes/Search/searchBarResults/socialMediaSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
    addresses: addressReducer,
    socialMedia: socialMediaReducer,
  },
});
