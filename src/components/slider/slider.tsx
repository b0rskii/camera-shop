import { useState } from 'react';
import { Camera } from '../../types/types';
import SimilarProductsList from '../similar-products-list/similar-products-list';

type SliderProps = {
  products: Camera[];
  displayedItemsCount: number;
};

function Slider({products, displayedItemsCount}: SliderProps): JSX.Element {
  const [startDisplayedIndex, setStartDisplayedIndex] = useState(0);

  const previousButtonClickHandler = () => {
    setStartDisplayedIndex(startDisplayedIndex - 1);
  };

  const nextButtonClickHandler = () => {
    setStartDisplayedIndex(startDisplayedIndex + 1);
  };

  return (
    <div className="product-similar__slider" data-testid="slider">
      <SimilarProductsList
        products={products}
        startDisplayedIndex={startDisplayedIndex}
        displayedItemsCount={displayedItemsCount}
      />
      {products.length > displayedItemsCount &&
      <>
        <button
          onClick={previousButtonClickHandler}
          className="slider-controls slider-controls--prev"
          type="button"
          aria-label="Предыдущий слайд"
          disabled={startDisplayedIndex === 0}
          data-testid="control-prev"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <button
          onClick={nextButtonClickHandler}
          className="slider-controls slider-controls--next"
          type="button"
          aria-label="Следующий слайд"
          disabled={startDisplayedIndex === products.length - displayedItemsCount}
          data-testid="control-next"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </>}
    </div>
  );
}

export default Slider;
