import { ChangeEvent } from 'react';

type CounterProps = {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

function Counter({value, onDecrement, onIncrement, onChange}: CounterProps): JSX.Element {
  return (
    <div className="quantity">
      <button
        onClick={onDecrement}
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        data-testid="decrement-button"
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter1"></label>
      <input
        onChange={onChange}
        type="number"
        id="counter1"
        value={value}
        aria-label="количество товара"
        data-testid="basket-items-count"
      />
      <button
        onClick={onIncrement}
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        data-testid="increment-button"
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default Counter;
