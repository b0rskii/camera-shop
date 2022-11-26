import { store } from '../store/store';
import { Camera, Promo, Review, BasketItem } from './types';

export type CamerasState = {
  cameras: Camera[];
  totalCount: number;
  isLoaded: boolean;
  loadingError: string | null;
  searchingCameras: Camera[];
};

export type PromoState = {
  promo: Promo | null;
  isLoaded: boolean;
  loadingError: string | null;
};

export type CurrentCameraState = {
  currentCamera: Camera | null;
  isLoaded: boolean;
  loadingError: string | null;
};

export type SimilarCamerasState = {
  similarCameras: Camera[];
  isLoaded: boolean;
  loadingError: string | null;
};

export type ReviewsState = {
  reviews: Review[];
  isLoaded: boolean;
  loadingError: string | null;
};

export type ErrorState = {
  error: string | null;
};

export type AppState = {
  currentProduct: Camera | null;
  isAddToBasketPopupOpened: boolean;
  isPostReviewPopupOpened: boolean;
  isSuccessPopupOpened: boolean;
  isSuccessAddToBasketPopupOpened: boolean;
  isBasketItemDeletingPopupOpened: boolean;
};

export type CatalogPaginationState = {
  currentPage: string | null;
};

export type CatalogSortState = {
  sort: string | null;
  order: string | null;
};

export type CatalogFilterState = {
  minPrice: string | null;
  maxPrice: string | null;
  category: string[];
  type: string[];
  level: string[];
  minPriceLimit: number;
  maxPriceLimit: number;
  nearestMinPrice: string | null;
  nearestMaxPrice: string | null;
};

export type BasketState = {
  basketItems: BasketItem[];
  cameras: Camera[];
  isCamerasLoading: boolean;
  camerasLoadingError: string | null;
  discount: number;
  promoCode: string;
  isOrderPosting: boolean;
  postingError: string | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
