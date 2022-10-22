import { store } from '../store/store';
import { Camera, Promo, Review } from './types';

export type CamerasState = {
  cameras: Camera[];
  totalCount: number;
  isLoaded: boolean;
  loadingError: string | null;
  searchingCameras: Camera[];
  defaultError: string;
};

export type PromoState = {
  promo: Promo | null;
  isLoaded: boolean;
  loadingError: string | null;
  defaultError: string;
};

export type CurrentCameraState = {
  currentCamera: Camera | null;
  isLoaded: boolean;
  loadingError: string | null;
  defaultError: string;
};

export type SimilarCamerasState = {
  similarCameras: Camera[];
  isLoaded: boolean;
  loadingError: string | null;
  defaultError: string;
};

export type ReviewsState = {
  reviews: Review[];
  isLoaded: boolean;
  loadingError: string | null;
  defaultError: string;
};

export type ErrorState = {
  error: string | null;
};

export type AppState = {
  currentProduct: Camera | null;
  isAddToBasketPopupOpened: boolean;
  isPostReviewPopupOpened: boolean;
  isSuccessPopupOpened: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
