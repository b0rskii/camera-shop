import { State } from '../../types/state';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { NameSpace } from '../../const';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasTotalCount = (state: State): number => state[NameSpace.Data].camerasTotalCount;
export const getCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCamerasLoaded;
export const getPromo = (state: State): Promo | null => state[NameSpace.Data].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Data].isPromoLoaded;
export const getCurrentCamera = (state: State): Camera | null => state[NameSpace.Data].currentCamera;
export const getCurrentCameraLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCurrentCameraLoaded;
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Data].similarCameras;
export const getSimilarCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isSimilarCamerasLoaded;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Data].isReviewsLoaded;
