import appReducer from './app-slice';
import { AppState } from '../../types/state';
import { makeMockCamera } from '../../utils/mocks';
import { postReviewAction } from '../api-actions';
import {
  currentProductUpdate,
  addToBasketPopupStatusUpdate,
  postReviewPopupStatusUpdate,
  successPopupStatusUpdate
} from './app-slice';

describe('Reducer: appReducer', () => {
  let initialState: AppState;

  beforeEach(() => {
    initialState = {
      currentProduct: null,
      isAddToBasketPopupOpened: false,
      isPostReviewPopupOpened: false,
      isSuccessPopupOpened: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('should change current product to given value', () => {
    const camera = makeMockCamera();

    expect(appReducer(initialState, currentProductUpdate(camera)))
      .toEqual({
        ...initialState,
        currentProduct: camera
      });
  });

  it('should change add to basket popup status to given value', () => {
    expect(appReducer(initialState, addToBasketPopupStatusUpdate(true)))
      .toEqual({
        ...initialState,
        isAddToBasketPopupOpened: true
      });
  });

  it('should change post review popup status to given value', () => {
    expect(appReducer(initialState, postReviewPopupStatusUpdate(true)))
      .toEqual({
        ...initialState,
        isPostReviewPopupOpened: true
      });
  });

  it('should change success popup status to given value', () => {
    expect(appReducer(initialState, successPopupStatusUpdate(true)))
      .toEqual({
        ...initialState,
        isSuccessPopupOpened: true
      });
  });

  describe('postReviewAction test', () => {
    it('if fulfilled should set post review popup status to "false", success popup status to "true"', () => {
      const state = {
        ...initialState,
        isPostReviewPopupOpened: true
      };

      expect(appReducer(initialState, postReviewAction.fulfilled))
        .toEqual({
          ...state,
          isPostReviewPopupOpened: false,
          isSuccessPopupOpened: true
        });
    });
  });
});