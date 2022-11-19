import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { Camera } from '../../types/types';
import { adaptCamerasToClient } from '../../utils/utils';

const selectSimilarCameras = (state: State): Camera[] => state.SimilarCameras.similarCameras;

export const getSimilarCamerasLoadingStatus = (state: State): boolean => state.SimilarCameras.isLoaded;
export const getSimilarCamerasLoadingError = (state: State): string | null => state.SimilarCameras.loadingError;

export const getSimilarCameras = createSelector(
  selectSimilarCameras,
  (similarCameras): Camera[] => adaptCamerasToClient(similarCameras)
);
