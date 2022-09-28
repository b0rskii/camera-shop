import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

const initialState: DataState = {
  cameras: [],
  isCamerasLoaded: false,
  promo: null,
  isPromoLoaded: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoaded = true;
      });
  },
});
