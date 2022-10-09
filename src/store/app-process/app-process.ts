import { createSlice } from '@reduxjs/toolkit';
import { postReviewAction } from '../api-actions';
import { AppState } from '../../types/state';
import { Camera } from '../../types/types';
import { NameSpace } from '../../const';

const initialState: AppState = {
  currentProduct: null,
  isAddToBasketPopupOpened: false,
  isPostReviewPopupOpened: false,
  isSuccessPopupOpened: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentProduct: (state, action: {payload: Camera | null; type: string}) => {
      state.currentProduct = action.payload;
    },
    setIsAddToBasketPopupOpened: (state, action: {payload: boolean; type: string}) => {
      state.isAddToBasketPopupOpened = action.payload;
    },
    setIsPostReviewPopupOpened: (state, action: {payload: boolean; type: string}) => {
      state.isPostReviewPopupOpened = action.payload;
    },
    setIsSuccessPopupOpened: (state, action: {payload: boolean; type: string}) => {
      state.isSuccessPopupOpened = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isPostReviewPopupOpened = false;
        state.isSuccessPopupOpened = true;
      });
  },
});

export const {
  setCurrentProduct,
  setIsAddToBasketPopupOpened,
  setIsPostReviewPopupOpened,
  setIsSuccessPopupOpened
} = appProcess.actions;
