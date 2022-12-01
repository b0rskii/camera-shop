import { createSlice } from '@reduxjs/toolkit';
import { PromoState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromoAction } from '../api-actions';

const initialState: PromoState = {
  promo: null,
  isLoaded: false,
  loadingError: null,
};

const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isLoaded = false;
        state.loadingError = null;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isLoaded = true;
        state.loadingError = null;
      })
      .addCase(fetchPromoAction.rejected, (state, action) => {
        const error = action.error.code || null;
        state.isLoaded = true;
        state.loadingError = error;
      });
  },
});

export default promoSlice.reducer;
