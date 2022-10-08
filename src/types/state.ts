import { store } from '../store/store';
import { Camera, Promo, Review } from './types';

export type DataState = {
  cameras: Camera[];
  camerasTotalCount: number;
  isCamerasLoaded: boolean;
  promo: Promo | null;
  isPromoLoaded: boolean;
  currentCamera: Camera | null;
  isCurrentCameraLoaded: boolean;
  similarCameras: Camera[];
  isSimilarCamerasLoaded: boolean;
  reviews: Review[];
  isReviewsLoaded: boolean;
};

export type AppState = {
  currentProduct: Camera | null;
  isAddToBasketPopupOpened: boolean;
  isPostReviewPopupOpened: boolean;
  isStatusPopupOpened: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
