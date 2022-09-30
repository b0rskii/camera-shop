import { store } from '../store';
import { Camera } from './camera';
import { Promo } from './promo';

export type DataState = {
  cameras: Camera[];
  camerasTotalCount: number;
  isCamerasLoaded: boolean;
  promo: Promo | null;
  isPromoLoaded: boolean;
};

export type AppState = {
  currentCatalogPage: number;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
