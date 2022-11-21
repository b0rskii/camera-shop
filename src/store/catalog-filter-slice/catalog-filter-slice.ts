import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSearchParams } from 'react-router-dom';
import { CatalogFilterState } from '../../types/state';
import {
  fetchMinPriceCameraAction,
  fetchMaxPriceCameraAction,
  fetchNearestMinPriceCameraAction,
  fetchNearestMaxPriceCameraAction
} from '../api-actions';
import { NameSpace, InitialCatalogPriceLimit, AppQuery } from '../../const';
import browserHistory from '../../browser-history';

const searchParams = createSearchParams(browserHistory.location.search);

const minPrice = searchParams.get(AppQuery.CatalogMinPriceFilter);
const maxPrice = searchParams.get(AppQuery.CatalogMaxPriceFilter);
const category = searchParams.getAll(AppQuery.CatalogCategoryFilter);
const type = searchParams.getAll(AppQuery.CatalogTypeFilter);
const level = searchParams.getAll(AppQuery.CatalogLevelFilter);

const initialState: CatalogFilterState = {
  minPrice: minPrice,
  maxPrice: maxPrice,
  category: category,
  type: type,
  level: level,
  minPriceLimit: InitialCatalogPriceLimit.Min,
  maxPriceLimit: InitialCatalogPriceLimit.Max,
  nearestMinPrice: null,
  nearestMaxPrice: null,
};

const catalogFilterSlice = createSlice({
  name: NameSpace.CatalogFilter,
  initialState,
  reducers: {
    catalogFilterMinPriceUpdate: (state, action: PayloadAction<string | null>) => {
      const newValue = action.payload === '' ? null : action.payload;

      if (newValue === state.minPrice || newValue === state.nearestMinPrice) {
        return;
      }

      state.nearestMinPrice = null;

      if (!state.maxPrice && newValue && Number(newValue) > state.maxPriceLimit) {
        state.minPrice = state.maxPriceLimit.toString();
        return;
      }

      state.minPrice = newValue;
    },
    catalogFilterMaxPriceUpdate: (state, action: PayloadAction<string | null>) => {
      const newValue = action.payload === '' ? null : action.payload;

      if (newValue === state.maxPrice || newValue === state.nearestMaxPrice) {
        return;
      }

      state.nearestMaxPrice = null;

      if (!state.minPrice && newValue && Number(newValue) < state.minPriceLimit) {
        state.maxPrice = state.minPriceLimit.toString();
        return;
      }

      if (state.minPrice && newValue && Number(newValue) < Number(state.nearestMinPrice)) {
        state.maxPrice = state.nearestMinPrice;
        return;
      }

      state.maxPrice = newValue;
    },
    catalogFilterCategoryUpdate: (state, action: PayloadAction<string>) => {
      const filter = action.payload;

      if (state.category.some((item) => item === filter)) {
        state.category = state.category.filter((item) => item !== filter);
        return;
      }

      state.category.push(filter);
    },
    catalogFilterTypeUpdate: (state, action: PayloadAction<string>) => {
      const filter = action.payload;

      if (state.type.some((item) => item === filter)) {
        state.type = state.type.filter((item) => item !== filter);
        return;
      }

      state.type.push(filter);
    },
    catalogFilterLevelUpdate: (state, action: PayloadAction<string>) => {
      const filter = action.payload;

      if (state.level.some((item) => item === filter)) {
        state.level = state.level.filter((item) => item !== filter);
        return;
      }

      state.level.push(filter);
    },
    catalogFilterReset: (state) => {
      state.minPrice = null;
      state.maxPrice = null;
      state.category = [];
      state.type = [];
      state.level = [];
      state.nearestMinPrice = null;
      state.nearestMaxPrice = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMinPriceCameraAction.fulfilled, (state, action) => {
        state.minPriceLimit = action.payload.price;
      })
      .addCase(fetchMaxPriceCameraAction.fulfilled, (state, action) => {
        state.maxPriceLimit = action.payload.price;
      })
      .addCase(fetchNearestMinPriceCameraAction.fulfilled, (state, action) => {
        state.nearestMinPrice = action.payload.price.toString();
      })
      .addCase(fetchNearestMaxPriceCameraAction.fulfilled, (state, action) => {
        state.nearestMaxPrice = action.payload.price.toString();
      });
  },
});

export const {
  catalogFilterMinPriceUpdate,
  catalogFilterMaxPriceUpdate,
  catalogFilterCategoryUpdate,
  catalogFilterTypeUpdate,
  catalogFilterLevelUpdate,
  catalogFilterReset
} = catalogFilterSlice.actions;

export default catalogFilterSlice.reducer;
