import similarCamerasReducer from './similar-cameras-slice';
import { SimilarCamerasState } from '../../types/state';
import { makeMockCameras } from '../../utils/mocks';
import { fetchSimilarCamerasAction } from '../api-actions';

describe('Reducer: similarCamerasReducer', () => {
  let initialState: SimilarCamerasState;

  beforeEach(() => {
    initialState = {
      similarCameras: [],
      isLoaded: false,
      loadingError: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(similarCamerasReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('if pending should set similar cameras loaded status to "false", similar cameras loading error to "null"', () => {
      const state = {
        ...initialState,
        isLoaded: true,
        loadingError: 'error'
      };

      expect(similarCamerasReducer(state, fetchSimilarCamerasAction.pending))
        .toEqual({
          ...state,
          isLoaded: false,
          loadingError: null
        });
    });

    it('if fulfilled should change similar cameras to given value, set similar cameras loaded status to "true", similar cameras loading error to "null"', () => {
      const similarCameras = makeMockCameras();
      const state = {
        ...initialState,
        similarCamerasLoadingError: 'error'
      };

      expect(similarCamerasReducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras}))
        .toEqual({
          ...state,
          similarCameras: similarCameras,
          isLoaded: true,
          loadingError: null,
        });
    });

    it('if rejected should set similar cameras loaded status to "true", similar cameras loading error to default error', () => {
      const ERROR = '400';

      expect(similarCamerasReducer(initialState, {type: fetchSimilarCamerasAction.rejected, error: {code: ERROR}}))
        .toEqual({
          ...initialState,
          isLoaded: true,
          loadingError: ERROR,
        });
    });
  });
});
