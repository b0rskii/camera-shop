import { store } from '../store/store';
import { Camera, Promo, Review } from './types';

export type DataState = {
  cameras: Camera[];
  camerasTotalCount: number;
  isCamerasLoaded: boolean;
  camerasLoadingError: string | null;

  promo: Promo | null;
  isPromoLoaded: boolean;
  promoLoadingError: string | null;

  currentCamera: Camera | null;
  isCurrentCameraLoaded: boolean;
  currentCameraLoadingError: string | null;

  similarCameras: Camera[];
  isSimilarCamerasLoaded: boolean;
  similarCamerasLoadingError: string | null;

  reviews: Review[];
  isReviewsLoaded: boolean;
  reviewsLoadingError: string | null;

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
