import camerasReducer from './cameras-slice';
import { CamerasState } from '../../types/state';
import { DEFAULT_ERROR_MESSAGE } from '../../const';
import { makeMockCameras, Mock } from '../../utils/mocks';
import { fetchCamerasAction } from '../api-actions';

describe('Reducer: camerasReducer', () => {
  let initialState: CamerasState;

  beforeEach(() => {
    initialState = {
      cameras: [],
      totalCount: 0,
      isLoaded: false,
      loadingError: null,
      searchingCameras: [],
      defaultError: DEFAULT_ERROR_MESSAGE,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  describe('fetchCamerasAction test', () => {
    it('if pending should set cameras loaded status to "false", cameras loading error to "null"', () => {
      const state = {
        ...initialState,
        isLoaded: true,
        loadingError: 'error'
      };

      expect(camerasReducer(state, fetchCamerasAction.pending))
        .toEqual({
          ...state,
          isLoaded: false,
          loadingError: null
        });
    });

    it('if fulfilled should change cameras to given value, set cameras loaded status to "true", change cameras total count to given value, cameras loading error to "null"', () => {
      const cameras = makeMockCameras();
      const state = {
        ...initialState,
        loadingError: 'error'
      };
      const payload = {
        cameras: cameras,
        totalCount: Mock.CamerasTotalCount
      };

      expect(camerasReducer(state, {type: fetchCamerasAction.fulfilled.type, payload}))
        .toEqual({
          ...state,
          cameras: payload.cameras,
          totalCount: Number(payload.totalCount),
          isLoaded: true,
          loadingError: null,
        });
    });

    it('if rejected should set cameras loaded status to "true", cameras loading error to default error', () => {
      expect(camerasReducer(initialState, fetchCamerasAction.rejected))
        .toEqual({
          ...initialState,
          isLoaded: true,
          loadingError: initialState.defaultError,
        });
    });
  });
});
