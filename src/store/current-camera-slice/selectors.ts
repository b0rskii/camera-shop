import { State } from '../../types/state';
import { Camera } from '../../types/types';

export const getCurrentCamera = (state: State): Camera | null => state.CurrentCamera.currentCamera;
export const getCurrentCameraLoadingStatus = (state: State): boolean => state.CurrentCamera.isLoaded;
export const getCurrentCameraLoadingError = (state: State): string | null => state.CurrentCamera.loadingError;
