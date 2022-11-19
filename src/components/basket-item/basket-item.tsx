import { memo, ChangeEvent } from 'react';
import { Camera } from '../../types/types';
import BasketItemShort from '../basket-item-short/basket-item-short';

type BasketItemProps = {
  item: Camera;
  itemsCount: number;
  minItemsCount: number;
  maxItemsCount: number;
  onRemoveButtonClick: (product: Camera) => void;
  onCounterChange: (id: number, value: number) => void;
};

function BasketItem(props: BasketItemProps): JSX.Element {
  const {item, itemsCount, minItemsCount, maxItemsCount, onRemoveButtonClick, onCounterChange} = props;
  const {price, id} = item;

  const handleCounterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(evt.currentTarget.value);

    if (newValue < minItemsCount) {
      onCounterChange(id, minItemsCount);
      return;
    }

    if (newValue > maxItemsCount) {
      onCounterChange(id, maxItemsCount);
      return;
    }

    onCounterChange(id, newValue);
  };

  const handleDecrementButtonClick = () => {
    if (itemsCount === minItemsCount) {
      return;
    }
    onCounterChange(id, itemsCount - 1);
  };

  const handleIncrementButtonClick = () => {
    if (itemsCount === maxItemsCount) {
      return;
    }
    onCounterChange(id, itemsCount + 1);
  };

  return (
    <li className="basket-item">
      <BasketItemShort item={item} />
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
      </p>
      <div className="quantity">
        <button
          onClick={handleDecrementButtonClick}
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          onChange={handleCounterChange}
          type="number"
          id="counter1"
          value={itemsCount}
          aria-label="количество товара"
        />
        <button
          onClick={handleIncrementButtonClick}
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(price * itemsCount).toLocaleString()} ₽
      </div>
      <button
        onClick={() => onRemoveButtonClick(item)}
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default memo(BasketItem);
