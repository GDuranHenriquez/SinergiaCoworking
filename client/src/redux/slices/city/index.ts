import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityState, City } from "./typesCity";

const initialState: CityState = {
  allCities: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setAllCities: (state, action: PayloadAction<City[]>) => {
      state.allCities = action.payload;
    },
  },
});

export const { setAllCities } = citySlice.actions;

export default citySlice.reducer;
