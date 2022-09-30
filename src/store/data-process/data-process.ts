import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

const initialState: DataState = {
  cameras: [],
  camerasTotalCount: 0,
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
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasLoaded = false;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        const camerasTotalCount = Number(action.payload.totalCount);

        if (state.camerasTotalCount !== camerasTotalCount) {
          state.camerasTotalCount = camerasTotalCount;
        }

        state.cameras = action.payload.cameras;
        state.isCamerasLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoaded = true;
      });
  },
});
