import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState } from '../../types/state';
import { Camera } from '../../types/types';
import { NameSpace } from '../../const';

const initialState: BasketState = {
  basketItems: [],
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
  },
});

export const { basketItemAdding, basketItemRemoving, basketItemsCountUpdate } = basketSlice.actions;
export default basketSlice.reducer;
