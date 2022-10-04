import { useState } from 'react';
import { Camera } from '../../types/camera';
import { DISPLAYED_SLIDER_ITEMS_COUNT } from '../../const';
import SimilarProductsList from '../similar-products-list/similar-products-list';

type ItemsSliderProps = {
  products: Camera[];
};

function ItemsSlider({products}: ItemsSliderProps): JSX.Element {
  const [startDisplayedItem, setStartDisplayedItem] = useState(0);

  const previousButtonClickHandler = () => {
    setStartDisplayedItem(startDisplayedItem - 1);
  };

  const nextButtonClickHandler = () => {
    setStartDisplayedItem(startDisplayedItem + 1);
  };

  return (
    <div className="product-similar__slider">
      <SimilarProductsList
        products={products}
        startDisplayedItem={startDisplayedItem}
      />
      {products.length > DISPLAYED_SLIDER_ITEMS_COUNT &&
      <>
        <button
          onClick={previousButtonClickHandler}
          className="slider-controls slider-controls--prev"
          type="button"
          aria-label="Предыдущий слайд"
          disabled={startDisplayedItem === 0}
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
          disabled={startDisplayedItem === products.length - DISPLAYED_SLIDER_ITEMS_COUNT}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </>}
    </div>
  );
}

export default ItemsSlider;
