import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState } from '../../types/state';
import { postPromoCodeAction, postOrderAction } from '../api-actions';
import { Camera } from '../../types/types';
import { NameSpace, DEFAULT_DISCOUNT } from '../../const';

const initialState: BasketState = {
  basketItems: [],
  discount: DEFAULT_DISCOUNT,
  promoCode: '',
  isOrderPosting: false,
  postingError: null,
};

const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    basketItemAdding: (state, action: PayloadAction<Camera>) => {
      const newBasketItem = action.payload;
      const sameItemIndex = state.basketItems
        .findIndex((item) => item.value.id === newBasketItem.id);

      if (sameItemIndex >= 0) {
        state.basketItems[sameItemIndex].count++;
        return;
      }

      state.basketItems.push({
        value: newBasketItem,
        count: 1,
      });
    },
    basketItemRemoving: (state, action: PayloadAction<number>) => {
      const removedItemId = action.payload;
      state.basketItems = state.basketItems.filter((item) => item.value.id !== removedItemId);
    },
    basketItemsCountUpdate: (state, action: PayloadAction<{id: number; value: number}>) => {
      const itemId = action.payload.id;
      const newValue = action.payload.value;
      const itemIndex = state.basketItems
        .findIndex((item) => item.value.id === itemId);

      state.basketItems[itemIndex].count = newValue;
    },
    promoCodeUpdate: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postPromoCodeAction.fulfilled, (state, action) => {
        state.discount = action.payload;
      })
      .addCase(postPromoCodeAction.rejected, (state) => {
        state.discount = 0;
      })
      .addCase(postOrderAction.pending, (state) => {
        state.isOrderPosting = true;
        state.postingError = null;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isOrderPosting = false;
        state.basketItems = [];
        state.discount = 0;
        state.promoCode = '';
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
