import catalogFilterReducer from './catalog-filter-slice';
import { CatalogFilterState } from '../../types/state';
import { InitialCatalogPriceLimit } from '../../const';
import {
  catalogFilterMinPriceUpdate,
  catalogFilterMaxPriceUpdate,
  catalogFilterCategoryUpdate,
  catalogFilterTypeUpdate,
  catalogFilterLevelUpdate,
  catalogFilterReset
} from './catalog-filter-slice';
import {
  fetchMinPriceCameraAction,
  fetchMaxPriceCameraAction,
  fetchNearestMinPriceCameraAction,
  fetchNearestMaxPriceCameraAction
} from '../api-actions';
import { makeMockCamera } from '../../utils/mocks';

describe('Reducer: catalogFilterReducer', () => {
  let initialState: CatalogFilterState;

  beforeEach(() => {
    initialState = {
      minPrice: null,
      maxPrice: null,
      category: [],
      type: [],
      level: [],
      minPriceLimit: InitialCatalogPriceLimit.Min,
      maxPriceLimit: InitialCatalogPriceLimit.Max,
      nearestMinPrice: null,
      nearestMaxPrice: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(catalogFilterReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('should reset all filters', () => {
    const MIN_PRICE_LIMIT = 1000;
    const MAX_PRICE_LIMIT = 10000;

    const state = {
      minPrice: '2000',
      maxPrice: '5000',
      category: ['category'],
      type: ['type'],
      level: ['level'],
      minPriceLimit: MIN_PRICE_LIMIT,
      maxPriceLimit: MAX_PRICE_LIMIT,
      nearestMinPrice: '2000',
      nearestMaxPrice: '5000',
    };

    expect(catalogFilterReducer(state, catalogFilterReset()))
      .toEqual({
        ...state,
        minPrice: null,
        maxPrice: null,
        category: [],
        type: [],
        level: [],
        minPriceLimit: MIN_PRICE_LIMIT,
        maxPriceLimit: MAX_PRICE_LIMIT,
        nearestMinPrice: null,
        nearestMaxPrice: null,
      });
  });

  describe('catalogFilterMinPriceUpdate action', () => {
    it('if new value is equal previous value should no update', () => {
      const MIN_PRICE = '5000';
      const VALUE = '5000';

      const state = {
        ...initialState,
        minPrice: MIN_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMinPriceUpdate(VALUE)))
        .toEqual(state);
    });

    it('if value in limits should update min price to given value', () => {
      const MIN_PRICE_LIMIT = 1000;
      const MAX_PRICE_LIMIT = 10000;
      const VALUE = '5000';

      const state = {
        ...initialState,
        minPriceLimit: MIN_PRICE_LIMIT,
        maxPriceLimit: MAX_PRICE_LIMIT,
      };

      expect(catalogFilterReducer(state, catalogFilterMinPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          minPrice: VALUE,
        });
    });

    it('if value more than max limit should set min price to max limit value', () => {
      const MAX_PRICE_LIMIT = 10000;
      const VALUE = '12000';

      const state = {
        ...initialState,
        maxPriceLimit: MAX_PRICE_LIMIT,
      };

      expect(catalogFilterReducer(state, catalogFilterMinPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          minPrice: MAX_PRICE_LIMIT.toString(),
        });
    });

    it('should reset nearest min price', () => {
      const NEAREST_MIN_PRICE = '5000';
      const VALUE = '2000';

      const state = {
        ...initialState,
        nearestMinPrice: NEAREST_MIN_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMinPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          minPrice: VALUE,
          nearestMinPrice: null,
        });
    });

    it('if new value is empty string should set new value to "null"', () => {
      const VALUE = '';
      const MIN_PRICE = '1000';

      const state = {
        ...initialState,
        minPrice: MIN_PRICE,
        nearestMinPrice: MIN_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMinPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          minPrice: null,
          nearestMinPrice: null,
        });
    });

    it('if value is greater than the set maximum price', () => {
      const VALUE = '6000';
      const MAX_PRICE = '5000';

      const state = {
        ...initialState,
        maxPrice: MAX_PRICE,
        nearestMaxPrice: MAX_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMinPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          minPrice: VALUE,
          maxPrice: VALUE,
          nearestMaxPrice: null,
        });
    });
  });

  describe('catalogFilterMaxPriceUpdate action', () => {
    it('if new value is equal previous value should no update', () => {
      const MAX_PRICE = '5000';
      const VALUE = '5000';

      const state = {
        ...initialState,
        maxPrice: MAX_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMaxPriceUpdate(VALUE)))
        .toEqual(state);
    });

    it('if value in limits should update max price to given value', () => {
      const MIN_PRICE_LIMIT = 1000;
      const MAX_PRICE_LIMIT = 10000;
      const VALUE = '5000';

      const state = {
        ...initialState,
        minPriceLimit: MIN_PRICE_LIMIT,
        maxPriceLimit: MAX_PRICE_LIMIT,
      };

      expect(catalogFilterReducer(state, catalogFilterMaxPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          maxPrice: VALUE,
        });
    });

    it('if value less than min limit and min price is null should set max price to min limit value', () => {
      const MIN_PRICE_LIMIT = 1000;
      const VALUE = '500';

      const state = {
        ...initialState,
        minPriceLimit: MIN_PRICE_LIMIT,
      };

      expect(catalogFilterReducer(state, catalogFilterMaxPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          maxPrice: MIN_PRICE_LIMIT.toString(),
        });
    });

    it('should reset nearest max price', () => {
      const NEAREST_MAX_PRICE = '5000';
      const VALUE = '2000';

      const state = {
        ...initialState,
        nearestMaxPrice: NEAREST_MAX_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMaxPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          maxPrice: VALUE,
          nearestMaxPrice: null,
        });
    });

    it('if new value is empty string should set new value to "null"', () => {
      const VALUE = '';
      const MAX_PRICE = '1000';

      const state = {
        ...initialState,
        maxPrice: MAX_PRICE,
        nearestMaxPrice: MAX_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMaxPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          maxPrice: null,
          nearestMaxPrice: null,
        });
    });

    it('if value less than set min price should set max price to nearest min price value', () => {
      const VALUE = '500';
      const MIN_PRICE = '1000';

      const state = {
        ...initialState,
        minPrice: MIN_PRICE,
        nearestMinPrice: MIN_PRICE,
      };

      expect(catalogFilterReducer(state, catalogFilterMaxPriceUpdate(VALUE)))
        .toEqual({
          ...state,
          maxPrice: MIN_PRICE,
        });
    });
  });

  describe('catalogFilterCategoryUpdate action', () => {
    it('if current category filter is no active should set filter is active', () => {
      const FILTER = 'some category';

      expect(catalogFilterReducer(initialState, catalogFilterCategoryUpdate(FILTER)))
        .toEqual({
          ...initialState,
          category: [FILTER],
        });
    });

    it('if current category filter is active should set filter is no active', () => {
      const FILTER = 'some category';

      const state = {
        ...initialState,
        category: [FILTER],
      };

      expect(catalogFilterReducer(state, catalogFilterCategoryUpdate(FILTER)))
        .toEqual({
          ...initialState,
          category: [],
        });
    });
  });

  describe('catalogFilterTypeUpdate action', () => {
    it('if current type filter is no active should set filter is active', () => {
      const FILTER = 'some type';

      expect(catalogFilterReducer(initialState, catalogFilterTypeUpdate(FILTER)))
        .toEqual({
          ...initialState,
          type: [FILTER],
        });
    });

    it('if current type filter is active should set filter is no active', () => {
      const FILTER = 'some type';

      const state = {
        ...initialState,
        type: [FILTER],
      };

      expect(catalogFilterReducer(state, catalogFilterTypeUpdate(FILTER)))
        .toEqual({
          ...initialState,
          type: [],
        });
    });
  });

  describe('catalogFilterLevelUpdate action', () => {
    it('if current level filter is no active should set filter is active', () => {
      const FILTER = 'some level';

      expect(catalogFilterReducer(initialState, catalogFilterLevelUpdate(FILTER)))
        .toEqual({
          ...initialState,
          level: [FILTER],
        });
    });

    it('if current level filter is active should set filter is no active', () => {
      const FILTER = 'some level';

      const state = {
        ...initialState,
        level: [FILTER],
      };

      expect(catalogFilterReducer(state, catalogFilterLevelUpdate(FILTER)))
        .toEqual({
          ...initialState,
          level: [],
        });
    });
  });

  describe('async actions test', () => {
    it('if fetchMinPriceCameraAction fulfilled should set min price limit to price of loaded camera', () => {
      const payload = makeMockCamera();

      expect(catalogFilterReducer(initialState, {type: fetchMinPriceCameraAction.fulfilled.type, payload}))
        .toEqual({
          ...initialState,
          minPriceLimit: payload.price,
        });
    });

    it('if fetchMaxPriceCameraAction fulfilled should set max price limit to price of loaded camera', () => {
      const payload = makeMockCamera();

      expect(catalogFilterReducer(initialState, {type: fetchMaxPriceCameraAction.fulfilled.type, payload}))
        .toEqual({
          ...initialState,
          maxPriceLimit: payload.price,
        });
    });

    it('if fetchNearestMinPriceCameraAction fulfilled should set nearest min price to price of loaded camera', () => {
      const payload = makeMockCamera();

      expect(catalogFilterReducer(initialState, {type: fetchNearestMinPriceCameraAction.fulfilled.type, payload}))
        .toEqual({
          ...initialState,
          nearestMinPrice: payload.price.toString(),
        });
    });

    it('if fetchNearestMaxPriceCameraAction fulfilled should set nearest max price to price of loaded camera', () => {
      const payload = makeMockCamera();

      expect(catalogFilterReducer(initialState, {type: fetchNearestMaxPriceCameraAction.fulfilled.type, payload}))
        .toEqual({
          ...initialState,
          nearestMaxPrice: payload.price.toString(),
        });
    });
  });
});
