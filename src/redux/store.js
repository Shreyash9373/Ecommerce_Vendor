import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./slices/vendorSlice";

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
  },
});

export default store;
