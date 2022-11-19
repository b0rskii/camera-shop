import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { Camera } from '../../types/types';
import { adaptCamerasToClient } from '../../utils/utils';

const selectCameras = (state: State): Camera[] => state.Cameras.cameras;

export const getCamerasTotalCount = (state: State): number => state.Cameras.totalCount;
export const getCamerasLoadingStatus = (state: State): boolean => state.Cameras.isLoaded;
export const getCamerasLoadingError = (state: State): string | null => state.Cameras.loadingError;
export const getSearchingCameras = (state: State): Camera[] => state.Cameras.searchingCameras;

export const getCameras = createSelector(
  selectCameras,
  (cameras): Camera[] => adaptCamerasToClient(cameras)
);
