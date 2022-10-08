import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { getReviews, getReviewsLoadingStatus } from '../../store/data-process/selectors';
import { setIsPostReviewPopupOpened } from '../../store/app-process/app-process';
import { fetchReviewsAction } from '../../store/api-actions';
import { DEFAULT_DISPLAYED_REVIEWS_COUNT } from '../../const';
import ReviewsList from '../reviews-list/reviews-list';

type ReviewSectionProps = {
  id: string;
};

function ReviewSection({id}: ReviewSectionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const isReviewsLoaded = useAppSelector(getReviewsLoadingStatus);

  useEffect(() => {
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);

  const postReviewButtonClickHandler = () => {
    dispatch(setIsPostReviewPopupOpened(true));
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              onClick={postReviewButtonClickHandler}
              className="btn"
              type="button"
            >
              Оставить свой отзыв
            </button>
          </div>
          <ReviewsList
            reviews={reviews}
            isReviewsLoaded={isReviewsLoaded}
            partDispalyedReviews={DEFAULT_DISPLAYED_REVIEWS_COUNT}
          />
        </div>
      </section>
    </div>
  );
}

export default ReviewSection;
