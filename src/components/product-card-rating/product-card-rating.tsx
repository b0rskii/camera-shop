type ProductCardRateProps = {
  maxRating: number;
  rating: number;
  reviewCount: number;
};

function ProductCardRating({maxRating, rating, reviewCount}: ProductCardRateProps): JSX.Element {
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
    <div className="rate product-card__rate">
      {getRatingList()}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </div>
  );
}

export default ProductCardRating;
