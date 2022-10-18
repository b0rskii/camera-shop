import promoReducer from './promo-slice';
import { PromoState } from '../../types/state';
import { DEFAULT_ERROR_MESSAGE } from '../../const';
import { makeMockPromo } from '../../utils/mocks';
import { fetchPromoAction } from '../api-actions';

describe('Reducer: promoReducer', () => {
  let initialState: PromoState;

  beforeEach(() => {
    initialState = {
      promo: null,
      isLoaded: false,
      loadingError: null,
      defaultError: DEFAULT_ERROR_MESSAGE,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(promoReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  describe('fetchPromoAction test', () => {
    it('if pending should set promo loaded status to "false", promo loading error to "null"', () => {
      const state = {
        ...initialState,
        isLoaded: true,
        loadingError: 'error'
      };

      expect(promoReducer(state, fetchPromoAction.pending))
        .toEqual({
          ...state,
          isLoaded: false,
          loadingError: null
        });
    });

    it('if fulfilled should change promo to given value, set promo loaded status to "true", promo loading error to "null"', () => {
      const promo = makeMockPromo();
      const state = {
        ...initialState,
        loadingError: 'error'
      };

      expect(promoReducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
        .toEqual({
          ...state,
          promo: promo,
          isLoaded: true,
          loadingError: null,
        });
    });

    it('if rejected should set promo loaded status to "true", promo loading error to default error', () => {
      expect(promoReducer(initialState, fetchPromoAction.rejected))
        .toEqual({
          ...initialState,
          isLoaded: true,
          loadingError: initialState.defaultError,
        });
    });
  });
});
