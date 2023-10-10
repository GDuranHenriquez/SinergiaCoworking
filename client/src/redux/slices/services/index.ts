// index.js

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicesState } from "./typesServices";

const initialState: ServicesState = {
  allServices: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setAllServices: (state, action: PayloadAction<string[] | []>) => {
      state.allServices = action.payload;
    },
  },
});

export const { setAllServices } = servicesSlice.actions;

export default servicesSlice.reducer;
