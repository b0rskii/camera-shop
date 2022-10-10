import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { NameSpace, DEFAULT_ERROR_MESSAGE } from '../../const';
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
  camerasLoadingError: null,

  promo: null,
  isPromoLoaded: false,
  promoLoadingError: null,

  currentCamera: null,
  isCurrentCameraLoaded: false,
  currentCameraLoadingError: null,

  similarCameras: [],
  isSimilarCamerasLoaded: false,
  similarCamerasLoadingError: null,

  reviews: [],
  isReviewsLoaded: false,
  reviewsLoadingError: null,

  error: null,
  defaultError: DEFAULT_ERROR_MESSAGE,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setError: (state, action: {payload: string | null; type: string}) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasLoaded = false;
        state.camerasLoadingError = null;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        const camerasTotalCount = Number(action.payload.totalCount);

        if (state.camerasTotalCount !== camerasTotalCount) {
          state.camerasTotalCount = camerasTotalCount;
        }

        state.cameras = action.payload.cameras;
        state.isCamerasLoaded = true;
        state.camerasLoadingError = null;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasLoaded = true;
        state.camerasLoadingError = state.defaultError;
      })

      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoaded = false;
        state.promoLoadingError = null;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoaded = true;
        state.promoLoadingError = null;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoaded = true;
        state.promoLoadingError = state.defaultError;
      })

      .addCase(fetchCurrentCameraAction.pending, (state) => {
        state.isCurrentCameraLoaded = false;
        state.currentCameraLoadingError = null;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.isCurrentCameraLoaded = true;
        state.currentCameraLoadingError = null;
      })
      .addCase(fetchCurrentCameraAction.rejected, (state) => {
        state.isCurrentCameraLoaded = true;
        state.currentCameraLoadingError = state.defaultError;
      })

      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isSimilarCamerasLoaded = false;
        state.similarCamerasLoadingError = null;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isSimilarCamerasLoaded = true;
        state.similarCamerasLoadingError = null;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.isSimilarCamerasLoaded = true;
        state.similarCamerasLoadingError = state.defaultError;
      })

      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoaded = false;
        state.reviewsLoadingError = null;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoaded = true;
        state.reviewsLoadingError = null;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoaded = true;
        state.reviewsLoadingError = state.defaultError;
      })

      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = [action.payload, ...state.reviews];
      });
  },
});

export const { setError } = dataProcess.actions;
