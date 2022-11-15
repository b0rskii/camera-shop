import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postReviewAction } from '../api-actions';
import { basketItemAdding } from '../basket-slice/basket-slice';
import { AppState } from '../../types/state';
import { Camera } from '../../types/types';
import { NameSpace } from '../../const';

const initialState: AppState = {
  currentProduct: null,
  isAddToBasketPopupOpened: false,
  isPostReviewPopupOpened: false,
  isSuccessPopupOpened: false,
  isSuccessAddToBasketPopupOpened: false,
};

const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    currentProductUpdate: (state, action: PayloadAction<Camera | null>) => {
      state.currentProduct = action.payload;
    },
    addToBasketPopupStatusUpdate: (state, action: PayloadAction<boolean>) => {
      state.isAddToBasketPopupOpened = action.payload;
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
  },
  extraReducers(builder) {
    builder
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isPostReviewPopupOpened = false;
        state.isSuccessPopupOpened = true;
      })
      .addCase(basketItemAdding.type, (state) => {
        state.isSuccessAddToBasketPopupOpened = true;
      });
  },
});

export const {
  currentProductUpdate,
  addToBasketPopupStatusUpdate,
  postReviewPopupStatusUpdate,
  successPopupStatusUpdate,
  successAddToBasketPopupStatusUpdate
} = appSlice.actions;

export default appSlice.reducer;
