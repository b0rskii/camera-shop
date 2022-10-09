import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { Review } from '../../types/types';
import ReviewCard from '../review-card/review-card';

type ReviewsListProps = {
  reviews: Review[];
  partDispalyedReviews: number;
};

function ReviewsList({reviews, partDispalyedReviews}: ReviewsListProps): JSX.Element {
  const [displayedReviews, setDisplayedReviews] = useState(partDispalyedReviews);

  useEffect(() => {
    let isMounted = true;

    if (reviews.length < displayedReviews) {
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
  }, [displayedReviews, partDispalyedReviews, reviews]);

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

  const showMoreButtonClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.currentTarget.blur();
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
