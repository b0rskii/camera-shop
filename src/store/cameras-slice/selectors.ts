import { State } from '../../types/state';
import { Camera } from '../../types/types';

export const getCameras = (state: State): Camera[] => state.Cameras.cameras;
export const getCamerasTotalCount = (state: State): number => state.Cameras.totalCount;
export const getCamerasLoadingStatus = (state: State): boolean => state.Cameras.isLoaded;
export const getCamerasLoadingError = (state: State): string | null => state.Cameras.loadingError;
