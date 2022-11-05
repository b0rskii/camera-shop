import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSearchParams } from 'react-router-dom';
import { CatalogPaginationState } from '../../types/state';
import {
  catalogFilterMinPriceUpdate,
  catalogFilterMaxPriceUpdate,
  catalogFilterCategoryUpdate,
  catalogFilterTypeUpdate,
  catalogFilterLevelUpdate,
  catalogFilterReset
} from '../catalog-filter-slice/catalog-filter-slice';
import { NameSpace, AppQuery } from '../../const';
import browserHistory from '../../browser-history';

const searchParams = createSearchParams(browserHistory.location.search);

const page = searchParams.get(AppQuery.CatalogPage);

const initialState: CatalogPaginationState = {
  currentPage: page,
};

const catalogPaginationSlice = createSlice({
  name: NameSpace.CatalogSort,
  initialState,
  reducers: {
    catalogPageUpdate: (state, action: PayloadAction<string | null>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(catalogFilterMinPriceUpdate, (state) => {
        state.currentPage = null;
      })
      .addCase(catalogFilterMaxPriceUpdate, (state) => {
        state.currentPage = null;
      })
      .addCase(catalogFilterCategoryUpdate, (state) => {
        state.currentPage = null;
      })
      .addCase(catalogFilterTypeUpdate, (state) => {
        state.currentPage = null;
      })
      .addCase(catalogFilterLevelUpdate, (state) => {
        state.currentPage = null;
      })
      .addCase(catalogFilterReset, (state) => {
        state.currentPage = null;
      });
  },
});

export const { catalogPageUpdate } = catalogPaginationSlice.actions;
export default catalogPaginationSlice.reducer;
