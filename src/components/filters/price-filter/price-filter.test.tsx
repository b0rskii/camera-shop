import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PriceFilter from './price-filter';

const onMinPriceUpdate = jest.fn();
const onMaxPriceUpdate = jest.fn();

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    const MIN_PRICE = null;
    const MAX_PRICE = null;
    const MIN_PRICE_LIMIT = null;
    const MAX_PRICE_LIMIT = null;
    const NEAREST_MIN_PRICE = null;
    const NEAREST_MAX_PRICE = null;

    render(
      <PriceFilter
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
        minPriceLimit={MIN_PRICE_LIMIT}
        maxPriceLimit={MAX_PRICE_LIMIT}
        nearestMinPrice={NEAREST_MIN_PRICE}
        nearestMaxPrice={NEAREST_MAX_PRICE}
        onMinPriceUpdate={onMinPriceUpdate}
        onMaxPriceUpdate={onMaxPriceUpdate}
      />
    );

    expect(screen.getByText(/Цена,/i)).toBeInTheDocument();
    expect(screen.getByTestId('min-price-input')).toBeInTheDocument();
    expect(screen.getByTestId('max-price-input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/от/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/до/i)).toBeInTheDocument();
  });

  it('should render correctly with entered price', () => {
    const MIN_PRICE = '1000';
    const MAX_PRICE = '5000';
    const MIN_PRICE_LIMIT = null;
    const MAX_PRICE_LIMIT = null;
    const NEAREST_MIN_PRICE = null;
    const NEAREST_MAX_PRICE = null;

    render(
      <PriceFilter
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
        minPriceLimit={MIN_PRICE_LIMIT}
        maxPriceLimit={MAX_PRICE_LIMIT}
        nearestMinPrice={NEAREST_MIN_PRICE}
        nearestMaxPrice={NEAREST_MAX_PRICE}
        onMinPriceUpdate={onMinPriceUpdate}
        onMaxPriceUpdate={onMaxPriceUpdate}
      />
    );

    expect(screen.getByTestId('min-price-input')).toHaveValue(Number(MIN_PRICE));
    expect(screen.getByTestId('max-price-input')).toHaveValue(Number(MAX_PRICE));
  });

  it('should render correctly with limit prices', () => {
    const MIN_PRICE = null;
    const MAX_PRICE = null;
    const MIN_PRICE_LIMIT = '1000';
    const MAX_PRICE_LIMIT = '5000';
    const NEAREST_MIN_PRICE = null;
    const NEAREST_MAX_PRICE = null;

    render(
      <PriceFilter
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
        minPriceLimit={MIN_PRICE_LIMIT}
        maxPriceLimit={MAX_PRICE_LIMIT}
        nearestMinPrice={NEAREST_MIN_PRICE}
        nearestMaxPrice={NEAREST_MAX_PRICE}
        onMinPriceUpdate={onMinPriceUpdate}
        onMaxPriceUpdate={onMaxPriceUpdate}
      />
    );

    expect(screen.getByPlaceholderText(MIN_PRICE_LIMIT)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(MAX_PRICE_LIMIT)).toBeInTheDocument();
  });

  it('should render correctly with nearest prices', () => {
    const MIN_PRICE = '1000';
    const MAX_PRICE = '5000';
    const MIN_PRICE_LIMIT = null;
    const MAX_PRICE_LIMIT = null;
    const NEAREST_MIN_PRICE = '990';
    const NEAREST_MAX_PRICE = '4990';

    render(
      <PriceFilter
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
        minPriceLimit={MIN_PRICE_LIMIT}
        maxPriceLimit={MAX_PRICE_LIMIT}
        nearestMinPrice={NEAREST_MIN_PRICE}
        nearestMaxPrice={NEAREST_MAX_PRICE}
        onMinPriceUpdate={onMinPriceUpdate}
        onMaxPriceUpdate={onMaxPriceUpdate}
      />
    );

    expect(screen.getByTestId('min-price-input')).toHaveValue(Number(NEAREST_MIN_PRICE));
    expect(screen.getByTestId('max-price-input')).toHaveValue(Number(NEAREST_MAX_PRICE));
  });

  it('should called callbacks when user keydown enter', async () => {
    const MIN_PRICE = null;
    const MAX_PRICE = null;
    const MIN_PRICE_LIMIT = null;
    const MAX_PRICE_LIMIT = null;
    const NEAREST_MIN_PRICE = null;
    const NEAREST_MAX_PRICE = null;

    render(
      <PriceFilter
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
        minPriceLimit={MIN_PRICE_LIMIT}
        maxPriceLimit={MAX_PRICE_LIMIT}
        nearestMinPrice={NEAREST_MIN_PRICE}
        nearestMaxPrice={NEAREST_MAX_PRICE}
        onMinPriceUpdate={onMinPriceUpdate}
        onMaxPriceUpdate={onMaxPriceUpdate}
      />
    );

    const minPriceInput = screen.getByTestId('min-price-input');
    const maxPriceInput = screen.getByTestId('max-price-input');

    minPriceInput.focus();
    await userEvent.keyboard('{enter}');

    expect(onMinPriceUpdate).toBeCalledTimes(1);

    maxPriceInput.focus();
    await userEvent.keyboard('{enter}');

    expect(onMaxPriceUpdate).toBeCalledTimes(1);
  });

  it('should called callbacks when user blur inputs', () => {
    const MIN_PRICE = null;
    const MAX_PRICE = null;
    const MIN_PRICE_LIMIT = null;
    const MAX_PRICE_LIMIT = null;
    const NEAREST_MIN_PRICE = null;
    const NEAREST_MAX_PRICE = null;

    render(
      <PriceFilter
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
        minPriceLimit={MIN_PRICE_LIMIT}
        maxPriceLimit={MAX_PRICE_LIMIT}
        nearestMinPrice={NEAREST_MIN_PRICE}
        nearestMaxPrice={NEAREST_MAX_PRICE}
        onMinPriceUpdate={onMinPriceUpdate}
        onMaxPriceUpdate={onMaxPriceUpdate}
      />
    );

    const minPriceInput = screen.getByTestId('min-price-input');
    const maxPriceInput = screen.getByTestId('max-price-input');

    fireEvent.blur(minPriceInput);

    expect(onMinPriceUpdate).toBeCalledTimes(1);

    fireEvent.blur(maxPriceInput);

    expect(onMaxPriceUpdate).toBeCalledTimes(1);

  });
});
