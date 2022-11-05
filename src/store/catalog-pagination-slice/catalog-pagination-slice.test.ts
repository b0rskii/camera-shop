import catalogPaginationReducer from './catalog-pagination-slice';
import { CatalogPaginationState } from '../../types/state';
import { catalogPageUpdate } from './catalog-pagination-slice';
import {
  catalogFilterMinPriceUpdate,
  catalogFilterMaxPriceUpdate,
  catalogFilterCategoryUpdate,
  catalogFilterTypeUpdate,
  catalogFilterLevelUpdate,
  catalogFilterReset
} from '../catalog-filter-slice/catalog-filter-slice';

describe('Reducer: catalogSortReducer', () => {
  let initialState: CatalogPaginationState;

  beforeEach(() => {
    initialState = {
      currentPage: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(catalogPaginationReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('should update current page to given value', () => {
    const NEW_CURRENT_PAGE = '2';

    expect(catalogPaginationReducer(initialState, catalogPageUpdate(NEW_CURRENT_PAGE)))
      .toEqual({
        ...initialState,
        currentPage: NEW_CURRENT_PAGE,
      });
  });

  describe('extra reducers', () => {
    let state: CatalogPaginationState;

    beforeEach(() => {
      state = {
        currentPage: '2',
      };
    });
    it('should reset current page when dispatched "catalogFilterMinPriceUpdate" action', () => {
      expect(catalogPaginationReducer(state, {type: catalogFilterMinPriceUpdate.type}))
        .toEqual({
          ...state,
          currentPage: null,
        });
    });

    it('should reset current page when dispatched "catalogFilterMaxPriceUpdate" action', () => {
      expect(catalogPaginationReducer(state, {type: catalogFilterMaxPriceUpdate.type}))
        .toEqual({
          ...state,
          currentPage: null,
        });
    });

    it('should reset current page when dispatched "catalogFilterCategoryUpdate" action', () => {
      expect(catalogPaginationReducer(state, {type: catalogFilterCategoryUpdate.type}))
        .toEqual({
          ...state,
          currentPage: null,
        });
    });

    it('should reset current page when dispatched "catalogFilterTypeUpdate" action', () => {
      expect(catalogPaginationReducer(state, {type: catalogFilterTypeUpdate.type}))
        .toEqual({
          ...state,
          currentPage: null,
        });
    });

    it('should reset current page when dispatched "catalogFilterLevelUpdate" action', () => {
      expect(catalogPaginationReducer(state, {type: catalogFilterLevelUpdate.type}))
        .toEqual({
          ...state,
          currentPage: null,
        });
    });

    it('should reset current page when dispatched "catalogFilterReset" action', () => {
      expect(catalogPaginationReducer(state, {type: catalogFilterReset.type}))
        .toEqual({
          ...state,
          currentPage: null,
        });
    });
  });
});
