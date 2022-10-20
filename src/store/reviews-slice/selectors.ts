import { State } from '../../types/state';
import { Review } from '../../types/types';

export const getReviews = (state: State): Review[] => state.Reviews.reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state.Reviews.isLoaded;
export const getReviewsLoadingError = (state: State): string | null => state.Reviews.loadingError;
