import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { Camera } from '../../types/types';
import { adaptCameraToClient } from '../../utils/utils';

const selectCurrentCamera = (state: State): Camera | null => state.CurrentCamera.currentCamera;

export const getCurrentCameraLoadingStatus = (state: State): boolean => state.CurrentCamera.isLoaded;
export const getCurrentCameraLoadingError = (state: State): string | null => state.CurrentCamera.loadingError;

export const getCurrentCamera = createSelector(
  selectCurrentCamera,
  (currentCamera): Camera | null => currentCamera ? adaptCameraToClient(currentCamera) : currentCamera
);
