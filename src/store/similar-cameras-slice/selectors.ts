import { State } from '../../types/state';
import { Camera } from '../../types/types';

export const getSimilarCameras = (state: State): Camera[] => state.SimilarCameras.similarCameras;
export const getSimilarCamerasLoadingStatus = (state: State): boolean => state.SimilarCameras.isLoaded;
export const getSimilarCamerasLoadingError = (state: State): string | null => state.SimilarCameras.loadingError;
