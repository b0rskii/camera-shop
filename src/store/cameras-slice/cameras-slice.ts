import { createSlice } from '@reduxjs/toolkit';
import { CamerasState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasAction, fetchSearchingCamerasAction } from '../api-actions';

const initialState: CamerasState = {
  cameras: [],
  totalCount: 0,
  isLoaded: false,
  loadingError: null,
  searchingCameras: [],
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
