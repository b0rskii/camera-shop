import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Camera, Promo, Review, PostingReview } from '../types/types';
import { APIRoute, APIQuery, CARDS_PER_PAGE_COUNT } from '../const';

const TOTAL_COUNT_HEADER = 'x-total-count';

type Store = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchCamerasAction = createAsyncThunk<{cameras: Camera[]; totalCount: string}, number, Store>(
  'data/fetchCameras',
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

export const fetchPromoAction = createAsyncThunk<Promo, undefined, Store>(
  'data/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  }
);

export const fetchCurrentCameraAction = createAsyncThunk<Camera, string, Store>(
  'data/fetchCurrentCamera',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    return data;
  }
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string, Store>(
  'data/fetchSimilarCameras',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, Store>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(
      `${APIRoute.Cameras}/${id}${APIRoute.Reviews}?${APIQuery.Sort}=createAt&${APIQuery.DescSort}`
    );
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, PostingReview, Store>(
  'data/postReview',
  async (review, {extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.Reviews, review);
    return data;
  },
);
