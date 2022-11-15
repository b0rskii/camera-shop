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
      state.basketItems.push(action.payload);
    },
  },
});

export const { basketItemAdding } = basketSlice.actions;
export default basketSlice.reducer;
