import { State } from '../../types/state';
import { Camera } from '../../types/types';
import { adaptCamerasToClient } from '../../utils/utils';

export const getSimilarCameras = (state: State): Camera[] => adaptCamerasToClient(state.SimilarCameras.similarCameras);
export const getSimilarCamerasLoadingStatus = (state: State): boolean => state.SimilarCameras.isLoaded;
export const getSimilarCamerasLoadingError = (state: State): string | null => state.SimilarCameras.loadingError;
