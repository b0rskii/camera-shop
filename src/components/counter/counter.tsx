import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { KeyName } from '../../const';

type CounterProps = {
  value: number;
  minLimit: number;
  maxLimit: number;
  onApplyValue: (newValue: number) => void;
};

function Counter({value, minLimit, maxLimit, onApplyValue}: CounterProps): JSX.Element {
  const [count, setCount] = useState(value.toString());

  useEffect(() => {
    setCount(value.toString());
  }, [value]);

  const onCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.currentTarget.value;

    if (newValue.length && Number(newValue) < minLimit) {
      setCount(minLimit.toString());
      return;
    }

    if (Number(newValue) > maxLimit) {
      setCount(maxLimit.toString());
      return;
    }

    setCount(newValue);
  };

  const onDecrementButtonClick = () => {
    if (value === minLimit) {
      return;
    }
    onApplyValue(value - 1);
  };

  const onIncrementButtonClick = () => {
    if (value === maxLimit) {
      return;
    }
    onApplyValue(value + 1);
  };

  const applyValue = () => {
    if (!count.length) {
      onApplyValue(minLimit);
      setCount(minLimit.toString());
      return;
    }
    onApplyValue(Number(count));
  };

  const onInputEnterKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === KeyName.Enter) {
      applyValue();
    }
  };

  const onInputBlur = () => {
    applyValue();
  };

  return (
    <div className="quantity">
      <button
        onClick={onDecrementButtonClick}
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
        onChange={onCountChange}
        onBlur={onInputBlur}
        onKeyDown={onInputEnterKeyDown}
        type="number"
        id="counter1"
        value={count}
        aria-label="количество товара"
        data-testid="basket-items-count"
      />
      <button
        onClick={onIncrementButtonClick}
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
