import { createSlice } from '@reduxjs/toolkit';
import { CamerasState } from '../../types/state';
import { NameSpace, DEFAULT_ERROR_MESSAGE } from '../../const';
import { fetchCamerasAction } from '../api-actions';

const initialState: CamerasState = {
  cameras: [],
  totalCount: 0,
  isLoaded: false,
  loadingError: null,
  defaultError: DEFAULT_ERROR_MESSAGE
};

const camerasSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
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
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isLoaded = true;
        state.loadingError = state.defaultError;
      });
  },
});

export default camerasSlice.reducer;
