import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfficeState, Office } from './typeOffice'; 

const initialState: OfficeState = {
  detatilOffice: {}
}

const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    setDetailOffice: (state, action: PayloadAction<Office | object>) => {
      state.detatilOffice = action.payload;
    }
  }
});


export const { setDetailOffice } = officeSlice.actions;

export default officeSlice.reducer;