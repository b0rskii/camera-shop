import { State } from '../../types/state';
import { Camera, Promo, Review } from '../../types/types';
import { NameSpace } from '../../const';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasTotalCount = (state: State): number => state[NameSpace.Data].camerasTotalCount;
export const getCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCamerasLoaded;
export const getCamerasLoadingError = (state: State): string | null => state[NameSpace.Data].camerasLoadingError;

export const getPromo = (state: State): Promo | null => state[NameSpace.Data].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Data].isPromoLoaded;
export const getPromoLoadingError = (state: State): string | null => state[NameSpace.Data].promoLoadingError;

export const getCurrentCamera = (state: State): Camera | null => state[NameSpace.Data].currentCamera;
export const getCurrentCameraLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCurrentCameraLoaded;
export const getCurrentCameraLoadingError = (state: State): string | null => state[NameSpace.Data].currentCameraLoadingError;

export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Data].similarCameras;
export const getSimilarCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isSimilarCamerasLoaded;
export const getSimilarCamerasLoadingError = (state: State): string | null => state[NameSpace.Data].similarCamerasLoadingError;

export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Data].isReviewsLoaded;
export const getReviewsLoadingError = (state: State): string | null => state[NameSpace.Data].reviewsLoadingError;

export const getError = (state: State): string | null => state[NameSpace.Data].error;
