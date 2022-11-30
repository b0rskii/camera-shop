import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postReviewAction, postOrderAction } from '../api-actions';
import { basketItemAdding } from '../basket-slice/basket-slice';
import { AppState } from '../../types/state';
import { AddToBasketPopupData, BasketItemDeletingPopupData } from '../../types/types';
import { NameSpace } from '../../const';

const initialState: AppState = {
  isAddToBasketPopupOpened: false,
  isPostReviewPopupOpened: false,
  isSuccessPopupOpened: false,
  isSuccessAddToBasketPopupOpened: false,
  isBasketItemDeletingPopupOpened: false,
};

const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    addToBasketPopupStatusUpdate: (state, action: PayloadAction<AddToBasketPopupData>) => {
      state.isAddToBasketPopupOpened = action.payload.isPopupOpened;
    },
    postReviewPopupStatusUpdate: (state, action: PayloadAction<boolean>) => {
      state.isPostReviewPopupOpened = action.payload;
    },
    successPopupStatusUpdate: (state, action: PayloadAction<boolean>) => {
      state.isSuccessPopupOpened = action.payload;
    },
    successAddToBasketPopupStatusUpdate: (state, action: PayloadAction<boolean>) => {
      state.isSuccessAddToBasketPopupOpened = action.payload;
    },
    basketItemDeletingPopupStatusUpdate: (state, action: PayloadAction<BasketItemDeletingPopupData>) => {
      state.isBasketItemDeletingPopupOpened = action.payload.isPopupOpened;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isPostReviewPopupOpened = false;
        state.isSuccessPopupOpened = true;
      })
      .addCase(basketItemAdding.type, (state) => {
        state.isSuccessAddToBasketPopupOpened = true;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isSuccessPopupOpened = true;
      });
  },
});

export const {
  addToBasketPopupStatusUpdate,
  postReviewPopupStatusUpdate,
  successPopupStatusUpdate,
  successAddToBasketPopupStatusUpdate,
  basketItemDeletingPopupStatusUpdate
} = appSlice.actions;

export default appSlice.reducer;
