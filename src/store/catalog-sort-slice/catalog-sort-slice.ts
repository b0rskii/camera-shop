import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSearchParams } from 'react-router-dom';
import { CatalogSortState } from '../../types/state';
import { NameSpace, AppQuery } from '../../const';
import browserHistory from '../../browser-history';

const searchParams = createSearchParams(browserHistory.location.search);

const sort = searchParams.get(AppQuery.CatalogSort);
const order = searchParams.get(AppQuery.CatalogSortOrder);

const initialState: CatalogSortState = {
  sort: sort,
  order: order,
};

const catalogSortSlice = createSlice({
  name: NameSpace.CatalogSort,
  initialState,
  reducers: {
    catalogSortUpdate: (state, action: PayloadAction<CatalogSortState>) => {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
});

export const { catalogSortUpdate } = catalogSortSlice.actions;
export default catalogSortSlice.reducer;
