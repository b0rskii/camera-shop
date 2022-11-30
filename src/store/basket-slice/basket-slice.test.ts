import basketReducer from './basket-slice';
import { BasketState } from '../../types/state';
import {
  basketItemAdding,
  basketItemRemoving,
  basketItemsCountUpdate,
  promoCodeUpdate
} from '../basket-slice/basket-slice';
import {
  fetchBasketCamerasAction,
  postPromoCodeAction,
  postOrderAction
} from '../api-actions';
import { makeMockCamera } from '../../utils/mocks';
import { DEFAULT_DISCOUNT, PromoCodeValidationStatus } from '../../const';

describe('Reducer: basketReducer', () => {
  let initialState: BasketState;

  beforeEach(() => {
    initialState = {
      basketItems: [],
      cameras: [],
      isCamerasLoading: false,
      camerasLoadingError: null,
      discount: DEFAULT_DISCOUNT,
      promoCode: '',
      promoCodeValidationStatus: PromoCodeValidationStatus.Unknown,
      isOrderPosting: false,
      postingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(basketReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('if there is no such item should add it', () => {
    const {id} = makeMockCamera();

    expect(basketReducer(initialState, basketItemAdding(id)))
      .toEqual({
        ...initialState,
        basketItems: [
          {
            id,
            count: 1,
          }
        ],
      });
  });

  it('if the item already exists should increase the count', () => {
    const {id} = makeMockCamera();
    const basketItem = {
      id,
      count: 1,
    };

    const state = {
      ...initialState,
      basketItems: [basketItem],
    };

    expect(basketReducer(state, basketItemAdding(id)))
      .toEqual({
        ...state,
        basketItems: [
          {
            id,
            count: 2,
          }
        ],
      });
  });

  it('should remove basket item and camera by id', () => {
    const camera = makeMockCamera();
    const cameras = [camera];
    const basketItem = {
      id: camera.id,
      count: 1,
    };

    const state = {
      ...initialState,
      basketItems: [basketItem],
      cameras: cameras,
    };

    expect(basketReducer(state, basketItemRemoving(camera.id)))
      .toEqual({
        ...initialState,
        basketItems: [],
        cameras: [],
      });
  });

  it('should update basket item count to given value', () => {
    const NEW_COUNT_VALUE = 5;
    const {id} = makeMockCamera();
    const basketItem = {
      id,
      count: 1,
    };

    const state = {
      ...initialState,
      basketItems: [basketItem],
    };

    expect(basketReducer(state, basketItemsCountUpdate({id, value: NEW_COUNT_VALUE})))
      .toEqual({
        ...initialState,
        basketItems: [
          {
            id,
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
    it('if pending should set promo code validation status to "unknown"', () => {
      const state = {
        ...initialState,
        promoCodeValidationStatus: PromoCodeValidationStatus.Invalid,
      };

      expect(basketReducer(state, postPromoCodeAction.pending))
        .toEqual({
          ...state,
          promoCodeValidationStatus: PromoCodeValidationStatus.Unknown,
        });
    });

    it('if fulfilled should update discount to given value and set promo code validation status to "valid"', () => {
      const NEW_DISCOUNT = 15;

      expect(basketReducer(initialState, {type: postPromoCodeAction.fulfilled.type, payload: NEW_DISCOUNT}))
        .toEqual({
          ...initialState,
          discount: NEW_DISCOUNT,
          promoCodeValidationStatus: PromoCodeValidationStatus.Valid,
        });
    });

    it('if rejected should reset discount and set promo code validation status to "invalid"', () => {
      const DISCOUNT = 15;
      const state = {
        ...initialState,
        discount: DISCOUNT,
      };

      expect(basketReducer(state, postPromoCodeAction.rejected))
        .toEqual({
          ...state,
          discount: 0,
          promoCodeValidationStatus: PromoCodeValidationStatus.Invalid,
        });
    });
  });

  describe('postOrderAction test', () => {
    it('if pending should set "isOrderPosting" to "true" and "postingError" to "null"', () => {
      const ERROR = '400';
      const state = {
        ...initialState,
        postingError: ERROR,
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
      const cameras = [camera];
      const basketItem = {
        id: camera.id,
        count: 1,
      };

      const state = {
        ...initialState,
        basketItems: [basketItem],
        cameras: cameras,
        discount: DISCOUNT,
        promoCode: PROMO_CODE,
        isOrderPosting: true,
        promoCodeValidationStatus: PromoCodeValidationStatus.Valid,
      };

      expect(basketReducer(state, postOrderAction.fulfilled))
        .toEqual({
          ...state,
          basketItems: [],
          cameras: [],
          discount: 0,
          promoCode: '',
          isOrderPosting: false,
          promoCodeValidationStatus: PromoCodeValidationStatus.Unknown,
        });
    });

    it('if rejected should set "isOrderPosting" to "false" and "postingError" to default error value', () => {
      const ERROR = '400';
      const state = {
        ...initialState,
        isOrderPosting: true,
      };

      expect(basketReducer(state, {type: postOrderAction.rejected.type, error: {code: ERROR}}))
        .toEqual({
          ...state,
          isOrderPosting: false,
          postingError: ERROR,
        });
    });
  });

  describe('fetchBasketCamerasAction test', () => {
    it('if pending should set "isCamerasLoading" to "true" and "camerasLoadingError" to "null"', () => {
      const ERROR = '400';
      const state = {
        ...initialState,
        camerasLoadingError: ERROR,
      };

      expect(basketReducer(state, fetchBasketCamerasAction.pending))
        .toEqual({
          ...initialState,
          isCamerasLoading: true,
          camerasLoadingError: null,
        });
    });

    it('if fulfilled should set "isCamerasLoading" to "false" and set cameras to given value', () => {
      const cameras = [makeMockCamera()];

      const state = {
        ...initialState,
        cameras: [],
        isCamerasLoading: true,
      };

      expect(basketReducer(state, {type: fetchBasketCamerasAction.fulfilled.type, payload: cameras}))
        .toEqual({
          ...state,
          cameras,
          isCamerasLoading: false,
        });
    });

    it('if rejected should set "isCamerasLoading" to "false" and "camerasLoadingError" to error value', () => {
      const ERROR = '400';
      const state = {
        ...initialState,
        isCamerasLoading: true,
      };

      expect(basketReducer(state, {type: fetchBasketCamerasAction.rejected.type, error: {code: ERROR}}))
        .toEqual({
          ...state,
          isCamerasLoading: false,
          camerasLoadingError: ERROR,
        });
    });
  });
});
