import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './counter';

const VALUE = 1;

const onDecrement = jest.fn();
const onIncrement = jest.fn();
const onChange = jest.fn();

describe('Component: Counter', () => {
  it('should render correctly', () => {
    render(
      <Counter
        value={VALUE}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onChange={onChange}
      />
    );

    expect(screen.getByDisplayValue(VALUE)).toBeInTheDocument();
    expect(screen.getByTestId('decrement-button')).toBeInTheDocument();
    expect(screen.getByTestId('increment-button')).toBeInTheDocument();
  });

  it('should called "onDecrement" when user clicked to decrement button', async () => {
    render(
      <Counter
        value={VALUE}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByTestId('decrement-button'));

    expect(onDecrement).toBeCalledTimes(1);
    expect(onIncrement).toBeCalledTimes(0);
  });

  it('should called "onIncrement" when user clicked to increment button', async () => {
    render(
      <Counter
        value={VALUE}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByTestId('increment-button'));

    expect(onDecrement).toBeCalledTimes(0);
    expect(onIncrement).toBeCalledTimes(1);
  });

  it('should called "onChange" when user change input value', async () => {
    render(
      <Counter
        value={VALUE}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onChange={onChange}
      />
    );

    await userEvent.type(screen.getByTestId('basket-items-count'), '55');

    expect(onChange).toBeCalledTimes(2);
  });
});
