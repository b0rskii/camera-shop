import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './counter';

const VALUE = 1;
const MIN_LIMIT = 1;
const MAX_LIMIT = 10;

const onApplyValue = jest.fn();

describe('Component: Counter', () => {
  it('should render correctly', () => {
    render(
      <Counter
        value={VALUE}
        minLimit={MIN_LIMIT}
        maxLimit={MAX_LIMIT}
        onApplyValue={onApplyValue}
      />
    );

    expect(screen.getByDisplayValue(VALUE)).toBeInTheDocument();
    expect(screen.getByTestId('decrement-button')).toBeInTheDocument();
    expect(screen.getByTestId('increment-button')).toBeInTheDocument();
  });

  it('should called "onApplyValue" when user press enter or blur on input', async () => {
    render(
      <Counter
        value={VALUE}
        minLimit={MIN_LIMIT}
        maxLimit={MAX_LIMIT}
        onApplyValue={onApplyValue}
      />
    );

    const inputElement = screen.getByTestId('basket-items-count');

    inputElement.focus();
    await userEvent.type(inputElement, '55');
    await userEvent.keyboard('{enter}');

    expect(onApplyValue).toBeCalledTimes(1);

    await userEvent.type(inputElement, '22');
    fireEvent.blur(inputElement);

    expect(onApplyValue).toBeCalledTimes(2);
  });
});
