import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendor: null, // Stores admin details
  isAuthenticated: false, // Tracks authentication state
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload;
      state.isAuthenticated = true;
      console.log("Vendor: ", state.vendor);
      console.log("Auth: ", state.isAuthenticated);
    },
    clearVendor: (state) => {
      state.vendor = null;
      state.isAuthenticated = false;
      console.log("Vendor: ", state.vendor);
      console.log("Auth: ", state.isAuthenticated);
    },
  },
});

export const { setVendor, clearVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
