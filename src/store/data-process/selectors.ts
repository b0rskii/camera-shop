import { State } from '../../types/state';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { NameSpace } from '../../const';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasTotalCount = (state: State): number => state[NameSpace.Data].camerasTotalCount;
export const getCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCamerasLoaded;
export const getPromo = (state: State): Promo | null => state[NameSpace.Data].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Data].isPromoLoaded;
