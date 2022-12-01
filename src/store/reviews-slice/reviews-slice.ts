import { createSlice } from '@reduxjs/toolkit';
import { ReviewsState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

const initialState: ReviewsState = {
  reviews: [],
  isLoaded: false,
  loadingError: null,
};

const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isLoaded = false;
        state.loadingError = null;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoaded = true;
        state.loadingError = null;
      })
      .addCase(fetchReviewsAction.rejected, (state, action) => {
        const error = action.error.code || null;
        state.isLoaded = true;
        state.loadingError = error;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = [action.payload, ...state.reviews];
      });
  },
});

export default reviewsSlice.reducer;
