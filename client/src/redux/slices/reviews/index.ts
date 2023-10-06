import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewState, Review } from './typeReviews'; 

const initialState: ReviewState = {
  Reviews: {}
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReview: (state, action: PayloadAction<Review | object>) => {
      state.Reviews = action.payload;
    }
  }
});


export const { setReview } = reviewSlice.actions;

export default reviewSlice.reducer;