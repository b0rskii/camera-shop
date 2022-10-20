import currentCameraReducer from './current-camera-slice';
import { CurrentCameraState } from '../../types/state';
import { DEFAULT_ERROR_MESSAGE } from '../../const';
import { makeMockCamera } from '../../utils/mocks';
import { fetchCurrentCameraAction } from '../api-actions';

describe('Reducer: currentCameraReducer', () => {
  let initialState: CurrentCameraState;

  beforeEach(() => {
    initialState = {
      currentCamera: null,
      isLoaded: false,
      loadingError: null,
      defaultError: DEFAULT_ERROR_MESSAGE,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(currentCameraReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  describe('fetchCurrentCameraAction test', () => {
    it('if pending should set current camera loaded status to "false", current camera loading error to "null"', () => {
      const state = {
        ...initialState,
        isLoaded: true,
        loadingError: 'error'
      };

      expect(currentCameraReducer(state, fetchCurrentCameraAction.pending))
        .toEqual({
          ...state,
          isLoaded: false,
          loadingError: null
        });
    });

    it('if fulfilled should change current camera to given value, set current camera loaded status to "true", current camera loading error to "null"', () => {
      const currentCamera = makeMockCamera();
      const state = {
        ...initialState,
        loadingError: 'error'
      };

      expect(currentCameraReducer(state, {type: fetchCurrentCameraAction.fulfilled.type, payload: currentCamera}))
        .toEqual({
          ...state,
          currentCamera: currentCamera,
          isLoaded: true,
          loadingError: null,
        });
    });

    it('if rejected should set current camera loaded status to "true", current camera loading error to default error', () => {
      expect(currentCameraReducer(initialState, fetchCurrentCameraAction.rejected))
        .toEqual({
          ...initialState,
          isLoaded: true,
          loadingError: initialState.defaultError,
        });
    });
  });
});
