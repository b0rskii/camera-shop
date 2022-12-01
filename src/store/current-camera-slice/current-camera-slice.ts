import { createSlice } from '@reduxjs/toolkit';
import { CurrentCameraState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCurrentCameraAction } from '../api-actions';

const initialState: CurrentCameraState = {
  currentCamera: null,
  isLoaded: false,
  loadingError: null,
};

const currentCameraSlice = createSlice({
  name: NameSpace.CurrentCamera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentCameraAction.pending, (state) => {
        state.isLoaded = false;
        state.loadingError = null;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.isLoaded = true;
        state.loadingError = null;
      })
      .addCase(fetchCurrentCameraAction.rejected, (state, action) => {
        const error = action.error.code || null;
        state.isLoaded = true;
        state.loadingError = error;
      });
  },
});

export default currentCameraSlice.reducer;
