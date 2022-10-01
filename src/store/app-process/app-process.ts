import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../types/state';
import { Camera } from '../../types/camera';
import { NameSpace } from '../../const';

const initialState: AppState = {
  currentProduct: null,
  isPopupOpened: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentProduct: (state, action: {payload: Camera | null; type: string}) => {
      state.currentProduct = action.payload;
    },
    setIsPopupOpened: (state, action: {payload: boolean; type: string}) => {
      state.isPopupOpened = action.payload;
    },
  },
});

export const { setIsPopupOpened, setCurrentProduct } = appProcess.actions;
