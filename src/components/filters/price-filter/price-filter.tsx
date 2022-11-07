import { useState, useEffect, KeyboardEvent, memo } from 'react';
import { KeyName } from '../../../const';

type PriceFilterProps = {
  minPrice: string | null;
  maxPrice: string | null;
  minPriceLimit: string | null;
  maxPriceLimit: string | null;
  nearestMinPrice: string | null;
  nearestMaxPrice: string | null;
  onMinPriceUpdate: (value: string | null) => void;
  onMaxPriceUpdate: (value: string | null) => void;
};

function PriceFilter(props: PriceFilterProps): JSX.Element {
  const {minPrice, maxPrice, minPriceLimit, maxPriceLimit, nearestMinPrice, nearestMaxPrice} = props;
  const {onMinPriceUpdate, onMaxPriceUpdate} = props;

  const [minPriceInputValue, setMinPriceInputValue] = useState(minPrice);
  const [maxPriceInputValue, setMaxPriceInputValue] = useState(maxPrice);

  useEffect(() => {
    setMinPriceInputValue(nearestMinPrice ? nearestMinPrice : minPrice);
    setMaxPriceInputValue(nearestMaxPrice ? nearestMaxPrice : maxPrice);
  }, [minPrice, maxPrice, nearestMinPrice, nearestMaxPrice]);

  const handlePriceFilterEnterKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === KeyName.Enter) {
      onMinPriceUpdate(minPriceInputValue);
      onMaxPriceUpdate(maxPriceInputValue);
    }
  };

  const handlePriceFilterBlur = () => {
    onMinPriceUpdate(minPriceInputValue);
    onMaxPriceUpdate(maxPriceInputValue);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onChange={(evt) => setMinPriceInputValue(evt.target.value)}
              onKeyDown={(evt) => handlePriceFilterEnterKeyDown(evt)}
              onBlur={handlePriceFilterBlur}
              type="number"
              name="price"
              placeholder={minPriceLimit ? minPriceLimit : 'от'}
              value={minPriceInputValue ? minPriceInputValue : ''}
              data-testid="min-price-input"
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              onChange={(evt) => setMaxPriceInputValue(evt.target.value)}
              onKeyDown={(evt) => handlePriceFilterEnterKeyDown(evt)}
              type="number"
              name="priceUp"
              placeholder={maxPriceLimit ? maxPriceLimit : 'до'}
              value={maxPriceInputValue ? maxPriceInputValue : ''}
              data-testid="max-price-input"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default memo(PriceFilter);
