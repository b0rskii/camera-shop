import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CamerasState } from '../../types/state';
import { AddToBasketPopupData } from '../../types/types';
import { addToBasketPopupStatusUpdate } from '../app-slice/app-slice';
import { fetchCamerasAction, fetchSearchingCamerasAction } from '../api-actions';
import { NameSpace } from '../../const';

const initialState: CamerasState = {
  cameras: [],
  totalCount: 0,
  isLoaded: false,
  loadingError: null,
  searchingCameras: [],
  selectedCamera: null,
};

const camerasSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    searchingCamerasReset: (state) => {
      state.searchingCameras = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addToBasketPopupStatusUpdate.type, (state, action: PayloadAction<AddToBasketPopupData>) => {
        state.selectedCamera = action.payload.product;
      })
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isLoaded = false;
        state.loadingError = null;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        const camerasTotalCount = Number(action.payload.totalCount);

        if (state.totalCount !== camerasTotalCount) {
          state.totalCount = camerasTotalCount;
        }

        state.cameras = action.payload.cameras;
        state.isLoaded = true;
        state.loadingError = null;
      })
      .addCase(fetchCamerasAction.rejected, (state, action) => {
        const error = action.error.code || null;
        state.isLoaded = true;
        state.loadingError = error;
      })
      .addCase(fetchSearchingCamerasAction.fulfilled, (state, action) => {
        state.searchingCameras = action.payload;
      });
  },
});

export const { searchingCamerasReset } = camerasSlice.actions;
export default camerasSlice.reducer;
