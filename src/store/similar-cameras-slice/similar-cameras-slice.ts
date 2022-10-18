import { createSlice } from '@reduxjs/toolkit';
import { SimilarCamerasState } from '../../types/state';
import { NameSpace, DEFAULT_ERROR_MESSAGE } from '../../const';
import { fetchSimilarCamerasAction } from '../api-actions';

const initialState: SimilarCamerasState = {
  similarCameras: [],
  isLoaded: false,
  loadingError: null,
  defaultError: DEFAULT_ERROR_MESSAGE,
};

export const similarCamerasSlice = createSlice({
  name: NameSpace.SimilarCameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isLoaded = false;
        state.loadingError = null;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isLoaded = true;
        state.loadingError = null;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.isLoaded = true;
        state.loadingError = state.defaultError;
      });
  },
});

export default similarCamerasSlice.reducer;
