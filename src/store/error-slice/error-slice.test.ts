import errorReducer from './error-slice';
import { ErrorState } from '../../types/state';
import { errorUpdate } from './error-slice';

describe('Reducer: errorReducer', () => {
  let initialState: ErrorState;

  beforeEach(() => {
    initialState = {
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(errorReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  it('should change error to given value', () => {
    const ERROR_MESSAGE = 'error';

    expect(errorReducer(initialState, errorUpdate(ERROR_MESSAGE)))
      .toEqual({
        ...initialState,
        error: ERROR_MESSAGE,
      });
  });
});
