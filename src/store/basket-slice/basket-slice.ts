import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState } from '../../types/state';
import { postPromoCodeAction, postOrderAction, fetchBasketCamerasAction } from '../api-actions';
import { NameSpace, DEFAULT_DISCOUNT, PromoCodeValidationStatus } from '../../const';

const initialState: BasketState = {
  basketItems: [],
  cameras: [],
  isCamerasLoading: false,
  camerasLoadingError: null,
  discount: DEFAULT_DISCOUNT,
  promoCode: '',
  promoCodeValidationStatus: PromoCodeValidationStatus.Unknown,
  isOrderPosting: false,
  postingError: null,
};

const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    basketItemAdding: (state, action: PayloadAction<number>) => {
      const newBasketItemId = action.payload;
      const sameItemIndex = state.basketItems
        .findIndex((item) => item.id === newBasketItemId);

      if (sameItemIndex >= 0) {
        state.basketItems[sameItemIndex].count++;
        return;
      }

      state.basketItems.push({
        id: newBasketItemId,
        count: 1,
      });
    },
    basketItemRemoving: (state, action: PayloadAction<number>) => {
      const removedItemId = action.payload;
      state.basketItems = state.basketItems.filter((item) => item.id !== removedItemId);
      state.cameras = state.cameras.filter((item) => item.id !== removedItemId);
    },
    basketItemsCountUpdate: (state, action: PayloadAction<{id: number; value: number}>) => {
      const newItemId = action.payload.id;
      const newValue = action.payload.value;
      const itemIndex = state.basketItems
        .findIndex((item) => item.id === newItemId);

      state.basketItems[itemIndex].count = newValue;
    },
    promoCodeUpdate: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBasketCamerasAction.pending, (state) => {
        state.isCamerasLoading = true;
        state.camerasLoadingError = null;
      })
      .addCase(fetchBasketCamerasAction.fulfilled, (state, action) => {
        state.isCamerasLoading = false;
        state.cameras = action.payload;
      })
      .addCase(fetchBasketCamerasAction.rejected, (state, action) => {
        const error = action.error.code || null;
        state.isCamerasLoading = false;
        state.camerasLoadingError = error;
      })
      .addCase(postPromoCodeAction.pending, (state, action) => {
        state.promoCodeValidationStatus = PromoCodeValidationStatus.Unknown;
      })
      .addCase(postPromoCodeAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.promoCodeValidationStatus = PromoCodeValidationStatus.Valid;
      })
      .addCase(postPromoCodeAction.rejected, (state) => {
        state.discount = 0;
        state.promoCodeValidationStatus = PromoCodeValidationStatus.Invalid;
      })
      .addCase(postOrderAction.pending, (state) => {
        state.isOrderPosting = true;
        state.postingError = null;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isOrderPosting = false;
        state.basketItems = [];
        state.cameras = [];
        state.discount = 0;
        state.promoCode = '';
        state.promoCodeValidationStatus = PromoCodeValidationStatus.Unknown;
      })
      .addCase(postOrderAction.rejected, (state, action) => {
        const error = action.error.code || null;
        state.isOrderPosting = false;
        state.postingError = error;
      });
  },
});

export const {
  basketItemAdding,
  basketItemRemoving,
  basketItemsCountUpdate,
  promoCodeUpdate
} = basketSlice.actions;
export default basketSlice.reducer;
