import catalogSortReducer from './catalog-sort-slice';
import { CatalogSortState } from '../../types/state';
import { catalogSortUpdate } from './catalog-sort-slice';

describe('Reducer: catalogSortReducer', () => {
  let initialState: CatalogSortState;

  beforeEach(() => {
    initialState = {
      sort: null,
      order: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(catalogSortReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('should update state to given values', () => {
    expect(catalogSortReducer(initialState, catalogSortUpdate({sort: 'price', order: 'asc'})))
      .toEqual({
        sort: 'price',
        order: 'asc',
      });
  });
});
