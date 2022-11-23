import appReducer from './app-slice';
import { AppState } from '../../types/state';
import { makeMockCamera } from '../../utils/mocks';
import { postReviewAction } from '../api-actions';
import {
  currentProductUpdate,
  addToBasketPopupStatusUpdate,
  postReviewPopupStatusUpdate,
  successPopupStatusUpdate,
  successAddToBasketPopupStatusUpdate,
  basketItemDeletingPopupStatusUpdate
} from './app-slice';
import { basketItemAdding } from '../basket-slice/basket-slice';

describe('Reducer: appReducer', () => {
  let initialState: AppState;

  beforeEach(() => {
    initialState = {
      currentProduct: null,
      isAddToBasketPopupOpened: false,
      isPostReviewPopupOpened: false,
      isSuccessPopupOpened: false,
      isSuccessAddToBasketPopupOpened: false,
      isBasketItemDeletingPopupOpened: false,
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

  it('should change success add to basket popup status to given value', () => {
    expect(appReducer(initialState, successAddToBasketPopupStatusUpdate(true)))
      .toEqual({
        ...initialState,
        isSuccessAddToBasketPopupOpened: true
      });
  });

  it('should change basket item deleting popup status to given value', () => {
    expect(appReducer(initialState, basketItemDeletingPopupStatusUpdate(true)))
      .toEqual({
        ...initialState,
        isBasketItemDeletingPopupOpened: true
      });
  });

  it('when dispatch "basketItemAdding" action should change success add to basket popup status to true', () => {
    expect(appReducer(initialState, {type: basketItemAdding.type}))
      .toEqual({
        ...initialState,
        isSuccessAddToBasketPopupOpened: true
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

  describe('postOrderAction test', () => {
    it('if fulfilled should set success popup status to "true"', () => {
      const state = {
        ...initialState,
        isSuccessPopupOpened: false
      };

      expect(appReducer(initialState, postReviewAction.fulfilled))
        .toEqual({
          ...state,
          isSuccessPopupOpened: true
        });
    });
  });
});
