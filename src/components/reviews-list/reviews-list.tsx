import { ReactNode } from 'react';
import { Review } from '../../types/review';
import ReviewCard from '../review-card/review-card';
import Loader from '../loader/loader';

type ReviewsListProps = {
  reviews: Review[];
  isReviewsLoaded: boolean;
  startDisplayedCount: number;
};

function ReviewsList({reviews, isReviewsLoaded, startDisplayedCount}: ReviewsListProps): JSX.Element {
  if (!isReviewsLoaded) {
    return <Loader />;
  }

  const items: ReactNode[] = [];

  for (const review of reviews) {
    if (items.length === startDisplayedCount) {
      break;
    }

    items.push(
      <ReviewCard
        review={review}
        key={review.id}
      />
    );
  }

  return (
    <>
      <ul className="review-block__list">
        {items}
      </ul>
      {reviews.length > startDisplayedCount &&
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button">
            Показать больше отзывов
          </button>
        </div>}
    </>
  );
}

export default ReviewsList;
