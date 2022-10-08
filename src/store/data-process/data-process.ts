import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { NameSpace } from '../../const';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchSimilarCamerasAction,
  fetchCurrentCameraAction,
  fetchReviewsAction,
  postReviewAction
} from '../api-actions';

const initialState: DataState = {
  cameras: [],
  camerasTotalCount: 0,
  isCamerasLoaded: false,
  promo: null,
  isPromoLoaded: false,
  currentCamera: null,
  isCurrentCameraLoaded: false,
  similarCameras: [],
  isSimilarCamerasLoaded: false,
  reviews: [],
  isReviewsLoaded: false,
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
      })
      .addCase(fetchCurrentCameraAction.pending, (state, action) => {
        state.isCurrentCameraLoaded = false;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.isCurrentCameraLoaded = true;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isSimilarCamerasLoaded = false;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isSimilarCamerasLoaded = true;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoaded = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoaded = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.reviews = [action.payload, ...state.reviews];
        }
      });
  },
});
