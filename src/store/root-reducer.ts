import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import camerasReducer from './cameras-slice/cameras-slice';
import currentCameraReducer from './current-camera-slice/current-camera-slice';
import promoReducer from './promo-slice/promo-slice';
import similarCamerasReducer from './similar-cameras-slice/similar-cameras-slice';
import reviewsReducer from './reviews-slice/reviews-slice';
import errorReducer from './error-slice/error-slice';
import appReducer from './app-slice/app-slice';
import catalogPaginationReducer from './catalog-pagination-slice/catalog-pagination-slice';
import catalogSortReducer from './catalog-sort-slice/catalog-sort-slice';
import catalogFilterReducer from './catalog-filter-slice/catalog-filter-slice';
import basketReducer from './basket-slice/basket-slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasReducer,
  [NameSpace.CurrentCamera]: currentCameraReducer,
  [NameSpace.Promo]: promoReducer,
  [NameSpace.SimilarCameras]: similarCamerasReducer,
  [NameSpace.Reviews]: reviewsReducer,
  [NameSpace.Error]: errorReducer,
  [NameSpace.App]: appReducer,
  [NameSpace.CatalogPagination]: catalogPaginationReducer,
  [NameSpace.CatalogSort]: catalogSortReducer,
  [NameSpace.CatalogFilter]: catalogFilterReducer,
  [NameSpace.Basket]: basketReducer,
});
