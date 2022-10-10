import { dataProcess } from './data-process';
import { DataState } from '../../types/state';

import { DEFAULT_ERROR_MESSAGE } from '../../const';
import {
  makeMockCameras,
  Mock,
  makeMockPromo,
  makeMockCamera,
  makeMockReviews,
  makeMockReview
} from '../../utils/mocks';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCurrentCameraAction,
  fetchSimilarCamerasAction,
  fetchReviewsAction,
  postReviewAction
} from '../api-actions';

describe('Reducer: dataProcess', () => {
  let initialState: DataState;

  beforeEach(() => {
    initialState = {
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
  });

  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  describe('fetchCamerasAction test', () => {
    it('if pending should set cameras loaded status to "false", cameras loading error to "null"', () => {
      const state = {...initialState, isCamerasLoaded: true, camerasLoadingError: 'error'};

      expect(dataProcess.reducer(state, fetchCamerasAction.pending))
        .toEqual({...state, isCamerasLoaded: false, camerasLoadingError: null});
    });

    it('if fulfilled should change cameras to given value, set cameras loaded status to "true", change cameras total count to given value, cameras loading error to "null"', () => {
      const cameras = makeMockCameras();
      const state = {...initialState, camerasLoadingError: 'error'};
      const payload = {cameras: cameras, totalCount: Mock.CamerasTotalCount};

      expect(dataProcess.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload}))
        .toEqual({
          ...state,
          cameras: payload.cameras,
          camerasTotalCount: Number(payload.totalCount),
          isCamerasLoaded: true,
          camerasLoadingError: null,
        });
    });

    it('if rejected should set cameras loaded status to "true", cameras loading error to default error', () => {
      expect(dataProcess.reducer(initialState, fetchCamerasAction.rejected))
        .toEqual({
          ...initialState,
          isCamerasLoaded: true,
          camerasLoadingError: initialState.defaultError,
        });
    });
  });

  describe('fetchPromoAction test', () => {
    it('if pending should set promo loaded status to "false", promo loading error to "null"', () => {
      const state = {...initialState, isPromoLoaded: true, promoLoadingError: 'error'};

      expect(dataProcess.reducer(state, fetchPromoAction.pending))
        .toEqual({...state, isPromoLoaded: false, promoLoadingError: null});
    });

    it('if fulfilled should change promo to given value, set promo loaded status to "true", promo loading error to "null"', () => {
      const promo = makeMockPromo();
      const state = {...initialState, promoLoadingError: 'error'};

      expect(dataProcess.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
        .toEqual({
          ...state,
          promo: promo,
          isPromoLoaded: true,
          promoLoadingError: null,
        });
    });

    it('if rejected should set promo loaded status to "true", promo loading error to default error', () => {
      expect(dataProcess.reducer(initialState, fetchPromoAction.rejected))
        .toEqual({
          ...initialState,
          isPromoLoaded: true,
          promoLoadingError: initialState.defaultError,
        });
    });
  });

  describe('fetchCurrentCameraAction test', () => {
    it('if pending should set current camera loaded status to "false", current camera loading error to "null"', () => {
      const state = {...initialState, isCurrentCameraLoaded: true, currentCameraLoadingError: 'error'};

      expect(dataProcess.reducer(state, fetchCurrentCameraAction.pending))
        .toEqual({...state, isCurrentCameraLoaded: false, currentCameraLoadingError: null});
    });

    it('if fulfilled should change current camera to given value, set current camera loaded status to "true", current camera loading error to "null"', () => {
      const currentCamera = makeMockCamera();
      const state = {...initialState, promoLoadingError: 'error'};

      expect(dataProcess.reducer(state, {type: fetchCurrentCameraAction.fulfilled.type, payload: currentCamera}))
        .toEqual({
          ...state,
          currentCamera: currentCamera,
          isCurrentCameraLoaded: true,
          currentCameraLoadingError: null,
        });
    });

    it('if rejected should set current camera loaded status to "true", current camera loading error to default error', () => {
      expect(dataProcess.reducer(initialState, fetchCurrentCameraAction.rejected))
        .toEqual({
          ...initialState,
          isCurrentCameraLoaded: true,
          currentCameraLoadingError: initialState.defaultError,
        });
    });
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('if pending should set similar cameras loaded status to "false", similar cameras loading error to "null"', () => {
      const state = {...initialState, isSimilarCamerasLoaded: true, similarCamerasLoadingError: 'error'};

      expect(dataProcess.reducer(state, fetchSimilarCamerasAction.pending))
        .toEqual({...state, isSimilarCamerasLoaded: false, similarCamerasLoadingError: null});
    });

    it('if fulfilled should change similar cameras to given value, set similar cameras loaded status to "true", similar cameras loading error to "null"', () => {
      const similarCameras = makeMockCameras();
      const state = {...initialState, similarCamerasLoadingError: 'error'};

      expect(dataProcess.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras}))
        .toEqual({
          ...state,
          similarCameras: similarCameras,
          isSimilarCamerasLoaded: true,
          similarCamerasLoadingError: null,
        });
    });

    it('if rejected should set similar cameras loaded status to "true", similar cameras loading error to default error', () => {
      expect(dataProcess.reducer(initialState, fetchSimilarCamerasAction.rejected))
        .toEqual({
          ...initialState,
          isSimilarCamerasLoaded: true,
          similarCamerasLoadingError: initialState.defaultError,
        });
    });
  });

  describe('fetchReviewsAction test', () => {
    it('if pending should set reviews loaded status to "false", reviews loading error to "null"', () => {
      const state = {...initialState, isReviewsLoaded: true, reviewsLoadingError: 'error'};

      expect(dataProcess.reducer(state, fetchReviewsAction.pending))
        .toEqual({...state, isReviewsLoaded: false, reviewsLoadingError: null});
    });

    it('if fulfilled should change reviews to given value, set reviews loaded status to "true", reviews loading error to "null"', () => {
      const reviews = makeMockReviews();
      const state = {...initialState, reviewsLoadingError: 'error'};

      expect(dataProcess.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
        .toEqual({
          ...state,
          reviews: reviews,
          isReviewsLoaded: true,
          reviewsLoadingError: null,
        });
    });

    it('if rejected should set reviews loaded status to "true", reviews loading error to default error', () => {
      expect(dataProcess.reducer(initialState, fetchReviewsAction.rejected))
        .toEqual({
          ...initialState,
          isReviewsLoaded: true,
          reviewsLoadingError: initialState.defaultError,
        });
    });
  });

  describe('postReviewAction test', () => {
    it('if fulfilled should add new review to start of reviews', () => {
      const reviews = makeMockReviews();
      const newReview = makeMockReview();
      const state = {...initialState, reviews: reviews};
      const updatedReviews = [newReview, ...reviews];

      expect(dataProcess.reducer(state, {type: postReviewAction.fulfilled.type, payload: newReview}))
        .toEqual({...state, reviews: updatedReviews});
    });
  });
});
