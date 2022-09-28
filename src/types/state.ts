import { store } from '../store';
import { Camera } from './camera';
import { Promo } from './promo';

export type DataState = {
  cameras: Camera[];
  isCamerasLoaded: boolean;
  promo: Promo | null;
  isPromoLoaded: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
