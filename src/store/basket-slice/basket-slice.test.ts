import basketReducer from './basket-slice';
import { BasketState } from '../../types/state';
import {
  basketItemAdding,
  basketItemRemoving,
  basketItemsCountUpdate,
  promoCodeUpdate
} from '../basket-slice/basket-slice';
import {
  postPromoCodeAction,
  postOrderAction
} from '../api-actions';
import { makeMockCamera } from '../../utils/mocks';
import { DEFAULT_DISCOUNT, DEFAULT_ERROR_MESSAGE } from '../../const';

describe('Reducer: basketReducer', () => {
  let initialState: BasketState;

  beforeEach(() => {
    initialState = {
      basketItems: [],
      discount: DEFAULT_DISCOUNT,
      promoCode: '',
      isOrderPosting: false,
      postingError: null,
      defaultError: DEFAULT_ERROR_MESSAGE,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(basketReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('if there is no such item should add it', () => {
    const camera = makeMockCamera();

    expect(basketReducer(initialState, basketItemAdding(camera)))
      .toEqual({
        ...initialState,
        basketItems: [
          {
            value: camera,
            count: 1,
          }
        ],
      });
  });

  it('if the item already exists should increase the count', () => {
    const camera = makeMockCamera();
    const basketItem = {
      value: camera,
      count: 1,
    };

    const state = {
      ...initialState,
      basketItems: [basketItem],
    };

    expect(basketReducer(state, basketItemAdding(camera)))
      .toEqual({
        ...state,
        basketItems: [
          {
            value: camera,
            count: 2,
          }
        ],
      });
  });

  it('should remove basket item by id', () => {
    const camera = makeMockCamera();
    const basketItem = {
      value: camera,
      count: 1,
    };

    const state = {
      ...initialState,
      basketItems: [basketItem],
    };

    expect(basketReducer(state, basketItemRemoving(camera.id)))
      .toEqual({
        ...initialState,
        basketItems: [],
      });
  });

  it('should update basket item count to given value', () => {
    const NEW_COUNT_VALUE = 5;
    const camera = makeMockCamera();
    const basketItem = {
      value: camera,
      count: 1,
    };

    const state = {
      ...initialState,
      basketItems: [basketItem],
    };

    expect(basketReducer(state, basketItemsCountUpdate({id: camera.id, value: NEW_COUNT_VALUE})))
      .toEqual({
        ...initialState,
        basketItems: [
          {
            value: camera,
            count: NEW_COUNT_VALUE,
          }
        ],
      });
  });

  it('should update promo code to given value', () => {
    const NEW_PROMO_CODE_VALUE = 'promo-code';

    expect(basketReducer(initialState, promoCodeUpdate(NEW_PROMO_CODE_VALUE)))
      .toEqual({
        ...initialState,
        promoCode: NEW_PROMO_CODE_VALUE,
      });
  });

  describe('postPromoCodeAction test', () => {
    it('if fulfilled should update discount to given value', () => {
      const NEW_DISCOUNT = 15;

      expect(basketReducer(initialState, {type: postPromoCodeAction.fulfilled.type, payload: NEW_DISCOUNT}))
        .toEqual({
          ...initialState,
          discount: NEW_DISCOUNT,
        });
    });

    it('if rejected should reset discount', () => {
      const DISCOUNT = 15;
      const state = {
        ...initialState,
        discount: DISCOUNT,
      };

      expect(basketReducer(state, postPromoCodeAction.rejected))
        .toEqual({
          ...state,
          discount: 0,
        });
    });
  });

  describe('postOrderAction test', () => {
    it('if pending should set "isOrderPosting" to "true" and "postingError" to "null"', () => {
      const state = {
        ...initialState,
        postingError: DEFAULT_ERROR_MESSAGE,
      };

      expect(basketReducer(state, postOrderAction.pending))
        .toEqual({
          ...initialState,
          isOrderPosting: true,
          postingError: null,
        });
    });

    it('if fulfilled should reset basket', () => {
      const DISCOUNT = 15;
      const PROMO_CODE = 'promo-code';
      const camera = makeMockCamera();
      const basketItem = {
        value: camera,
        count: 1,
      };

      const state = {
        ...initialState,
        basketItems: [basketItem],
        discount: DISCOUNT,
        promoCode: PROMO_CODE,
        isOrderPosting: true,
      };

      expect(basketReducer(state, postOrderAction.fulfilled))
        .toEqual({
          ...state,
          basketItems:  [],
          discount: 0,
          promoCode: '',
          isOrderPosting: false,
        });
    });

    it('if rejected should set "isOrderPosting" to "false" and "postingError" to default error value', () => {
      const state = {
        ...initialState,
        isOrderPosting: true,
      };

      expect(basketReducer(state, postOrderAction.rejected))
        .toEqual({
          ...state,
          isOrderPosting: false,
          postingError: DEFAULT_ERROR_MESSAGE,
        });
    });
  });
});
