import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../types/state';
import { Camera } from '../../types/camera';
import { NameSpace } from '../../const';

const initialState: AppState = {
  currentProduct: null,
  isAddToBasketPopupOpened: false,
  isPostReviewPopupOpened: false,
  isStatusPopupOpened: false,
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
    setIsStatusPopupOpened: (state, action: {payload: boolean; type: string}) => {
      state.isStatusPopupOpened = action.payload;
    },
  },
});

export const {
  setCurrentProduct,
  setIsAddToBasketPopupOpened,
  setIsPostReviewPopupOpened,
  setIsStatusPopupOpened
} = appProcess.actions;
