import { createSlice } from '@reduxjs/toolkit';
import { CurrentCameraState } from '../../types/state';
import { NameSpace, DEFAULT_ERROR_MESSAGE } from '../../const';
import { fetchCurrentCameraAction } from '../api-actions';

const initialState: CurrentCameraState = {
  currentCamera: null,
  isLoaded: false,
  loadingError: null,
  defaultError: DEFAULT_ERROR_MESSAGE,
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
      .addCase(fetchCurrentCameraAction.rejected, (state) => {
        state.isLoaded = true;
        state.loadingError = state.defaultError;
      });
  },
});

export default currentCameraSlice.reducer;
