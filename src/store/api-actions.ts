import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { APIRoute, CARDS_PER_PAGE_COUNT } from '../const';

const TOTAL_COUNT_HEADER = 'x-total-count';

type Store = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchCamerasAction = createAsyncThunk<{cameras: Camera[]; totalCount: string}, number, Store>(
  'data/fetchCameras',
  async (start, {extra: api}) => {
    const {data, headers} = await api.get<Camera[]>(`${APIRoute.Cameras}?_start=${start}&_limit=${CARDS_PER_PAGE_COUNT}`);
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
