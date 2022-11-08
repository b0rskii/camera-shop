import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Camera, Promo, Review, PostingReview } from '../types/types';
import { APIRoute, APIQuery, CARDS_PER_PAGE_COUNT, NameSpace, AppQuery, SortOrder } from '../const';
import { State } from '../types/state';

const TOTAL_COUNT_HEADER = 'x-total-count';

type ThunkAPI = {
  state: State;
  extra: AxiosInstance;
};

type FetchCamerasReturn = {
  cameras: Camera[];
  totalCount: string;
};

export const fetchCamerasAction = createAsyncThunk<FetchCamerasReturn, number, ThunkAPI>(
  `${NameSpace.Cameras}/fetchCameras`,
  async (startItem, {getState, extra: api}) => {
    const state: State = getState();
    const {sort, order} = state.CatalogSort;
    const {minPrice, maxPrice, category, type, level} = state.CatalogFilter;

    const {data, headers} = await api.get<Camera[]>(APIRoute.Cameras, {
      params: {
        [APIQuery.Sort]: sort,
        [APIQuery.Order]: order,
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Min}`]: minPrice,
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Max}`]: maxPrice,
        [AppQuery.CatalogCategoryFilter]: category,
        [AppQuery.CatalogTypeFilter]: type,
        [AppQuery.CatalogLevelFilter]: level,
        [APIQuery.Start]: startItem,
        [APIQuery.Limit]: CARDS_PER_PAGE_COUNT,
      },
    });

    return {
      cameras: data,
      totalCount: headers[TOTAL_COUNT_HEADER],
    };
  },
);

export const fetchMinPriceCameraAction = createAsyncThunk<Camera, undefined, ThunkAPI>(
  `${NameSpace.Cameras}/fetchMinPriceCamera`,
  async (_arg, {getState, extra: api}) => {
    const state: State = getState();
    const {minPrice, maxPrice, category, type, level} = state.CatalogFilter;

    const {data} = await api.get<Camera[]>(APIRoute.Cameras, {
      params: {
        [APIQuery.Sort]: AppQuery.CatalogPriceFilter,
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Min}`]: minPrice,
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Max}`]: maxPrice,
        [AppQuery.CatalogCategoryFilter]: category,
        [AppQuery.CatalogTypeFilter]: type,
        [AppQuery.CatalogLevelFilter]: level,
        [APIQuery.Start]: 0,
        [APIQuery.Limit]: 1,
      },
    });
    return data[0];
  },
);

export const fetchMaxPriceCameraAction = createAsyncThunk<Camera, undefined, ThunkAPI>(
  `${NameSpace.Cameras}/fetchMaxPriceCamera`,
  async (_arg, {getState, extra: api}) => {
    const state: State = getState();
    const {minPrice, maxPrice, category, type, level} = state.CatalogFilter;

    const {data} = await api.get<Camera[]>(APIRoute.Cameras, {
      params: {
        [APIQuery.Sort]: AppQuery.CatalogPriceFilter,
        [APIQuery.Order]: SortOrder.Desc,
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Min}`]: minPrice,
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Max}`]: maxPrice,
        [AppQuery.CatalogCategoryFilter]: category,
        [AppQuery.CatalogTypeFilter]: type,
        [AppQuery.CatalogLevelFilter]: level,
        [APIQuery.Start]: 0,
        [APIQuery.Limit]: 1,
      },
    });
    return data[0];
  },
);

export const fetchNearestMinPriceCameraAction = createAsyncThunk<Camera, string, ThunkAPI>(
  `${NameSpace.Cameras}/fetchNearestMinPriceCamera`,
  async (minPrice, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras, {
      params: {
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Min}`]: minPrice,
        [APIQuery.Sort]: AppQuery.CatalogPriceFilter,
        [APIQuery.Order]: SortOrder.Asc,
        [APIQuery.Limit]: 1,
      },
    });
    return data[0];
  },
);

export const fetchNearestMaxPriceCameraAction = createAsyncThunk<Camera, string, ThunkAPI>(
  `${NameSpace.Cameras}/fetchNearestMaxPriceCamera`,
  async (maxPrice, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras, {
      params: {
        [`${AppQuery.CatalogPriceFilter}${APIQuery.Max}`]: maxPrice,
        [APIQuery.Sort]: AppQuery.CatalogPriceFilter,
        [APIQuery.Order]: SortOrder.Desc,
        [APIQuery.Limit]: 1,
      },
    });
    return data[0];
  },
);

export const fetchSearchingCamerasAction = createAsyncThunk<Camera[], string, ThunkAPI>(
  `${NameSpace.Cameras}/fetchSearchingCameras`,
  async (searchText, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras, {
      params: {
        [`${AppQuery.CameraName}${APIQuery.Like}`]: searchText,
      },
    });
    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, ThunkAPI>(
  `${NameSpace.Promo}/fetchPromo`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  }
);

export const fetchCurrentCameraAction = createAsyncThunk<Camera, string, ThunkAPI>(
  `${NameSpace.CurrentCamera}/fetchCurrentCamera`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    return data;
  }
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string, ThunkAPI>(
  `${NameSpace.SimilarCameras}/fetchSimilarCameras`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, ThunkAPI>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`, {
      params: {
        [APIQuery.Sort]: 'createAt',
        [APIQuery.Order]: SortOrder.Desc,
      },
    });
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, PostingReview, ThunkAPI>(
  `${NameSpace.Reviews}/postReview`,
  async (review, {extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.Reviews, review);
    return data;
  },
);
