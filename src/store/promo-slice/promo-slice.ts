import { createSlice } from '@reduxjs/toolkit';
import { PromoState } from '../../types/state';
import { NameSpace, DEFAULT_ERROR_MESSAGE } from '../../const';
import { fetchPromoAction } from '../api-actions';

const initialState: PromoState = {
  promo: null,
  isLoaded: false,
  loadingError: null,
  defaultError: DEFAULT_ERROR_MESSAGE,
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
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isLoaded = true;
        state.loadingError = state.defaultError;
      });
  },
});

export default promoSlice.reducer;
