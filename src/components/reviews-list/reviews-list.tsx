import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { Review } from '../../types/review';
import ReviewCard from '../review-card/review-card';
import Loader from '../loader/loader';

type ReviewsListProps = {
  reviews: Review[];
  isReviewsLoaded: boolean;
  partDispalyedReviews: number;
};

function ReviewsList({reviews, isReviewsLoaded, partDispalyedReviews}: ReviewsListProps): JSX.Element {
  const [displayedReviews, setDisplayedReviews] = useState(partDispalyedReviews);

  useEffect(() => {
    let isMounted = true;

    if (isReviewsLoaded && reviews.length < displayedReviews) {
      return;
    }

    const scrollHandler = () => {
      if (window.scrollY === document.body.scrollHeight - window.innerHeight && isMounted) {
        setDisplayedReviews(displayedReviews + partDispalyedReviews);
      }
    };

    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
      isMounted = false;
    };
  }, [displayedReviews, partDispalyedReviews, reviews, isReviewsLoaded]);

  if (!isReviewsLoaded) {
    return <Loader />;
  }

  const reviewsList: ReactNode[] = [];

  for (const review of reviews) {
    if (reviewsList.length === displayedReviews) {
      break;
    }

    reviewsList.push(
      <ReviewCard
        review={review}
        key={review.id}
      />
    );
  }

  const showMoreButtonClickHandler = (evt: MouseEvent) => {
    evt.currentTarget.parentElement?.querySelector('button')?.blur();
    setDisplayedReviews(displayedReviews + partDispalyedReviews);
  };

  return (
    <>
      <ul className="review-block__list">
        {reviewsList}
      </ul>
      {reviews.length > displayedReviews &&
        <div className="review-block__buttons">
          <button
            onClick={showMoreButtonClickHandler}
            className="btn btn--purple"
            type="button"
          >
            Показать больше отзывов
          </button>
        </div>}
    </>
  );
}

export default ReviewsList;
