import { appProcess } from './app-process';
import { AppState } from '../../types/state';
import { makeMockCamera } from '../../utils/mocks';
import { postReviewAction } from '../api-actions';
import {
  setCurrentProduct,
  setIsAddToBasketPopupOpened,
  setIsPostReviewPopupOpened,
  setIsSuccessPopupOpened
} from './app-process';

describe('Reducer: appProcess', () => {
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
    expect(appProcess.reducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('should change current product to given value', () => {
    const camera = makeMockCamera();

    expect(appProcess.reducer(initialState, setCurrentProduct(camera)))
      .toEqual({...initialState, currentProduct: camera});
  });

  it('should change add to basket popup status to given value', () => {
    expect(appProcess.reducer(initialState, setIsAddToBasketPopupOpened(true)))
      .toEqual({...initialState, isAddToBasketPopupOpened: true});
  });

  it('should change post review popup status to given value', () => {
    expect(appProcess.reducer(initialState, setIsPostReviewPopupOpened(true)))
      .toEqual({...initialState, isPostReviewPopupOpened: true});
  });

  it('should change success popup status to given value', () => {
    expect(appProcess.reducer(initialState, setIsSuccessPopupOpened(true)))
      .toEqual({...initialState, isSuccessPopupOpened: true});
  });

  describe('postReviewAction test', () => {
    it('if fulfilled should set post review popup status to "false", success popup status to "true"', () => {
      const state = {...initialState, isPostReviewPopupOpened: true};

      expect(appProcess.reducer(initialState, postReviewAction.fulfilled))
        .toEqual({...state, isPostReviewPopupOpened: false, isSuccessPopupOpened: true});
    });
  });
});
