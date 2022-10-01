import { store } from '../store/store';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

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
  isPopupOpened: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
