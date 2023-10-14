import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PurchaseState, Purchase } from './typePurchase'; 

const initialState: PurchaseState = {
  Purchase: {}
}

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setPurchase: (state, action: PayloadAction<Purchase | object>) => {
      state.Purchase = action.payload;
    }
  }
});


export const { setPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;