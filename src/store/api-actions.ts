import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Camera, Promo, Review, PostingReview } from '../types/types';
import { APIRoute, APIQuery, CARDS_PER_PAGE_COUNT, NameSpace } from '../const';

const TOTAL_COUNT_HEADER = 'x-total-count';

type ThunkAPI = {
  extra: AxiosInstance;
};

export const fetchCamerasAction = createAsyncThunk<{cameras: Camera[]; totalCount: string}, number, ThunkAPI>(
  `${NameSpace.Cameras}/fetchCameras`,
  async (start, {extra: api}) => {
    const {data, headers} = await api.get<Camera[]>(
      `${APIRoute.Cameras}?${APIQuery.Start}=${start}&${APIQuery.Limit}=${CARDS_PER_PAGE_COUNT}`
    );
    return {
      cameras: data,
      totalCount: headers[TOTAL_COUNT_HEADER],
    };
  }
);

export const fetchSearchingCamerasAction = createAsyncThunk<Camera[], string, ThunkAPI>(
  `${NameSpace.Cameras}/fetchSearchingCameras`,
  async (searchText, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?name${APIQuery.Like}=${searchText}`);
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
    const {data} = await api.get<Review[]>(
      `${APIRoute.Cameras}/${id}${APIRoute.Reviews}?${APIQuery.Sort}=createAt&${APIQuery.DescSort}`
    );
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
