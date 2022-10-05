import { MAX_PRODUCT_RATE } from '../../const';

type RatingProps = {
  maxRating?: number;
  rating: number;
  reviewCount?: number;
};

function Rating({maxRating = MAX_PRODUCT_RATE, rating, reviewCount}: RatingProps): JSX.Element {
  const getRatingList = () => {
    const ratingList = [];

    for (let i = 0; i < maxRating; i++) {
      ratingList.push(
        <svg width="17" height="16" aria-hidden="true" key={i + 1}>
          <use xlinkHref={rating > i ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      );
    }

    return ratingList;
  };

  return (
    <>
      {getRatingList()}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      {reviewCount &&
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>}
    </>
  );
}

export default Rating;
