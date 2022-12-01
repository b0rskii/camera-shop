import { useState, useEffect, KeyboardEvent, memo, ChangeEvent } from 'react';
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
  }, [minPrice, nearestMinPrice]);

  useEffect(() => {
    setMaxPriceInputValue(nearestMaxPrice ? nearestMaxPrice : maxPrice);
  }, [maxPrice, nearestMaxPrice]);

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;

    if (Number(value) < 0) {
      setMinPriceInputValue('');
      return;
    }

    setMinPriceInputValue(value);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;

    if (Number(value) < 0) {
      setMaxPriceInputValue('');
      return;
    }

    setMaxPriceInputValue(value);
  };

  const handleMinPriceFilterEnterKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === KeyName.Enter) {
      onMinPriceUpdate(minPriceInputValue);
    }
  };

  const handleMaxPriceFilterEnterKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === KeyName.Enter) {
      onMaxPriceUpdate(maxPriceInputValue);
    }
  };

  const handleMinPriceFilterBlur = () => {
    onMinPriceUpdate(minPriceInputValue);
  };

  const handleMaxPriceFilterBlur = () => {
    onMaxPriceUpdate(maxPriceInputValue);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onChange={handleMinPriceChange}
              onKeyDown={handleMinPriceFilterEnterKeyDown}
              onBlur={handleMinPriceFilterBlur}
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
              onChange={handleMaxPriceChange}
              onKeyDown={handleMaxPriceFilterEnterKeyDown}
              onBlur={handleMaxPriceFilterBlur}
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
