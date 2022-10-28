import { useState, useEffect, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getCatalogFilterMaxPrice,
  getCatalogFilterMinPrice,
  getCatalogFilterMinPriceLimit,
  getCatalogFilterMaxPriceLimit,
  getCatalogFilterNearestMaxPrice,
  getCatalogFilterNearestMinPrice
} from '../../../store/filter-slice/selectors';
import { catalogFilterMaxPriceUpdate, catalogFilterMinPriceUpdate } from '../../../store/filter-slice/filter-slice';
import { AppQuery, InitialCatalogPriceLimit, KeyName } from '../../../const';

function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const minPrice = useAppSelector(getCatalogFilterMinPrice);
  const maxPrice = useAppSelector(getCatalogFilterMaxPrice);
  const minPriceLimit = useAppSelector(getCatalogFilterMinPriceLimit);
  const maxPriceLimit = useAppSelector(getCatalogFilterMaxPriceLimit);
  const nearestMinPrice = useAppSelector(getCatalogFilterNearestMinPrice);
  const nearestMaxPrice = useAppSelector(getCatalogFilterNearestMaxPrice);

  const [minPriceInputValue, setMinPriceInputValue] = useState(minPrice);
  const [maxPriceInputValue, setMaxPriceInputValue] = useState(maxPrice);

  useEffect(() => {
    setSearchParams((params) => {
      if (minPrice) {
        params.set(AppQuery.CatalogMinPriceFilter, nearestMinPrice ? nearestMinPrice : minPrice);
      } else {
        params.delete(AppQuery.CatalogMinPriceFilter);
      }

      if (maxPrice) {
        params.set(AppQuery.CatalogMaxPriceFilter, nearestMaxPrice ? nearestMaxPrice : maxPrice);
      } else {
        params.delete(AppQuery.CatalogMaxPriceFilter);
      }

      return params;
    });

    setMinPriceInputValue(nearestMinPrice ? nearestMinPrice : minPrice);
    setMaxPriceInputValue(nearestMaxPrice ? nearestMaxPrice : maxPrice);
  }, [setSearchParams, minPrice, maxPrice, nearestMinPrice, nearestMaxPrice]);

  const handlePriceFilterEnterKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === KeyName.Enter) {
      dispatch(catalogFilterMinPriceUpdate(minPriceInputValue));
      dispatch(catalogFilterMaxPriceUpdate(maxPriceInputValue));
    }
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
              type="number"
              name="price"
              placeholder={minPriceLimit === InitialCatalogPriceLimit.Min ? 'от' : minPriceLimit.toString()}
              value={minPriceInputValue ? minPriceInputValue : ''}
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
              placeholder={maxPriceLimit === InitialCatalogPriceLimit.Max ? 'до' : maxPriceLimit.toString()}
              value={maxPriceInputValue ? maxPriceInputValue : ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
