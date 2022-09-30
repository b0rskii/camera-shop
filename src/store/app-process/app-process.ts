import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: AppState = {
  currentCatalogPage: 1,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentCatalogPage: (state, action: {payload: number; type: string}) => {
      state.currentCatalogPage = action.payload;
    },
  },
});

export const { setCurrentCatalogPage } = appProcess.actions;
