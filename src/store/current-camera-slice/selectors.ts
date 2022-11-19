import { State } from '../../types/state';
import { Camera } from '../../types/types';
import { adaptCameraToClient } from '../../utils/utils';

export const getCurrentCamera = (state: State): Camera | null => {
  const currentCamera = state.CurrentCamera.currentCamera;
  return currentCamera ? adaptCameraToClient(currentCamera) : currentCamera;
};

export const getCurrentCameraLoadingStatus = (state: State): boolean => state.CurrentCamera.isLoaded;
export const getCurrentCameraLoadingError = (state: State): string | null => state.CurrentCamera.loadingError;
