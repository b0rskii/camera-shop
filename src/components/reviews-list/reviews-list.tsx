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

    const handleScroll = () => {
      if (window.scrollY === document.body.scrollHeight - window.innerHeight && isMounted) {
        setDisplayedReviews(displayedReviews + partDispalyedReviews);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
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

  const handleShowMoreButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.currentTarget.blur();
    setDisplayedReviews(displayedReviews + partDispalyedReviews);
  };

  return (
    <>
      <ul className="review-block__list" data-testid="reviews-list">
        {reviewsList}
      </ul>
      {reviews.length > displayedReviews &&
        <div className="review-block__buttons">
          <button
            onClick={handleShowMoreButtonClick}
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
