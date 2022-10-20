import reviewsReducer from './reviews-slice';
import { ReviewsState } from '../../types/state';
import { DEFAULT_ERROR_MESSAGE } from '../../const';
import { makeMockReviews, makeMockReview } from '../../utils/mocks';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

describe('Reducer: reviewsReducer', () => {
  let initialState: ReviewsState;

  beforeEach(() => {
    initialState = {
      reviews: [],
      isLoaded: false,
      loadingError: null,
      defaultError: DEFAULT_ERROR_MESSAGE,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsReducer(undefined, {type: 'UnknownAction'}))
      .toEqual(initialState);
  });

  describe('fetchReviewsAction test', () => {
    it('if pending should set reviews loaded status to "false", reviews loading error to "null"', () => {
      const state = {
        ...initialState,
        isLoaded: true,
        loadingError: 'error'
      };

      expect(reviewsReducer(state, fetchReviewsAction.pending))
        .toEqual({
          ...state,
          isLoaded: false,
          loadingError: null
        });
    });

    it('if fulfilled should change reviews to given value, set reviews loaded status to "true", reviews loading error to "null"', () => {
      const reviews = makeMockReviews();
      const state = {
        ...initialState,
        loadingError: 'error'
      };

      expect(reviewsReducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
        .toEqual({
          ...state,
          reviews: reviews,
          isLoaded: true,
          loadingError: null,
        });
    });

    it('if rejected should set reviews loaded status to "true", reviews loading error to default error', () => {
      expect(reviewsReducer(initialState, fetchReviewsAction.rejected))
        .toEqual({
          ...initialState,
          isLoaded: true,
          loadingError: initialState.defaultError,
        });
    });
  });

  describe('postReviewAction test', () => {
    it('if fulfilled should add new review to start of reviews', () => {
      const reviews = makeMockReviews();
      const newReview = makeMockReview();
      const state = {
        ...initialState,
        reviews: reviews
      };
      const updatedReviews = [newReview, ...reviews];

      expect(reviewsReducer(state, {type: postReviewAction.fulfilled.type, payload: newReview}))
        .toEqual({
          ...state,
          reviews: updatedReviews
        });
    });
  });
});
