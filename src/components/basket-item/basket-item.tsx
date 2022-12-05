import { memo } from 'react';
import { Camera } from '../../types/types';
import BasketItemShort from '../basket-item-short/basket-item-short';
import Counter from '../counter/counter';

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

  const handleCounterChange = (newValue: number) => {
    onCounterChange(id, newValue);
  };

  return (
    <li className="basket-item" data-testid="basket-item">
      <BasketItemShort item={item} />
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
      </p>
      <Counter
        value={itemsCount}
        minLimit={minItemsCount}
        maxLimit={maxItemsCount}
        onApplyValue={handleCounterChange}
      />
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(price * itemsCount).toLocaleString()} ₽
      </div>
      <button
        onClick={() => onRemoveButtonClick(item)}
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        data-testid="delete-basket-item-button"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default memo(BasketItem);
