import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
  getReviews,
  getReviewsLoadingStatus,
  getReviewsLoadingError
} from '../../store/reviews-slice/selectors';
import { postReviewPopupStatusUpdate } from '../../store/app-slice/app-slice';
import { fetchReviewsAction } from '../../store/api-actions';
import { DEFAULT_DISPLAYED_REVIEWS_COUNT } from '../../const';
import ReviewsList from '../reviews-list/reviews-list';
import Loader from '../loader/loader';
import Error from '../error/error';

type ReviewSectionProps = {
  id: string;
};

function ReviewSection({id}: ReviewSectionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const isReviewsLoaded = useAppSelector(getReviewsLoadingStatus);
  const reviewsLoadingError = useAppSelector(getReviewsLoadingError);

  useEffect(() => {
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);

  const handlePostReviewButtonClick = () => {
    dispatch(postReviewPopupStatusUpdate(true));
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            {isReviewsLoaded &&
            <button
              onClick={handlePostReviewButtonClick}
              className="btn"
              type="button"
            >
              Оставить свой отзыв
            </button>}
          </div>

          {!isReviewsLoaded &&
          <Loader wrapper/>}

          {reviewsLoadingError &&
          <Error message={reviewsLoadingError} />}

          {isReviewsLoaded && !reviewsLoadingError && reviews.length < 1 &&
          <h3 className="title title--h4">Пока нет ни одного отзыва</h3>}

          {isReviewsLoaded && !reviewsLoadingError && reviews.length > 0 &&
          <ReviewsList
            reviews={reviews}
            partDispalyedReviews={DEFAULT_DISPLAYED_REVIEWS_COUNT}
          />}
        </div>
      </section>
    </div>
  );
}

export default ReviewSection;
