import { createSlice } from '@reduxjs/toolkit';
import { SimilarCamerasState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchSimilarCamerasAction } from '../api-actions';

const initialState: SimilarCamerasState = {
  similarCameras: [],
  isLoaded: false,
  loadingError: null,
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
      .addCase(fetchSimilarCamerasAction.rejected, (state, action) => {
        const error = action.error.code || null;
        state.isLoaded = true;
        state.loadingError = error;
      });
  },
});

export default similarCamerasSlice.reducer;
