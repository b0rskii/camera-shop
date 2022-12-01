import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasketSummaryOrder from './basket-summary-order';

const TOTAL_PRICE = 50000;
const DEFAULT_DISCOUNT = 0;

const onPostOrder = jest.fn();

describe('Component: BasketSummaryOrder', () => {
  it('should render correctly without discount', () => {
    const DISCOUNT = DEFAULT_DISCOUNT;

    render(
      <BasketSummaryOrder
        totalPrice={TOTAL_PRICE}
        discount={DISCOUNT}
        defaultDiscount={DEFAULT_DISCOUNT}
        isOrderPosting={false}
        onPostOrder={onPostOrder}
      />
    );

    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.queryByText(/Оформить заказ/i)).not.toBeDisabled();
    expect(screen.queryByTestId('basket-summary-value')).not.toHaveClass('basket__summary-value--bonus');
  });

  it('should render correctly with discount', () => {
    const DISCOUNT = 15;

    render(
      <BasketSummaryOrder
        totalPrice={TOTAL_PRICE}
        discount={DISCOUNT}
        defaultDiscount={DEFAULT_DISCOUNT}
        isOrderPosting={false}
        onPostOrder={onPostOrder}
      />
    );

    expect(screen.getByTestId('basket-summary-value')).toHaveClass('basket__summary-value--bonus');
  });

  it('should render correctly if order posting', () => {
    const DISCOUNT = 0;

    render(
      <BasketSummaryOrder
        totalPrice={TOTAL_PRICE}
        discount={DISCOUNT}
        defaultDiscount={DEFAULT_DISCOUNT}
        isOrderPosting
        onPostOrder={onPostOrder}
      />
    );

    expect(screen.getByText(/Оформить заказ/i)).toBeDisabled();
  });

  it('should called callback when user clicked to button', async () => {
    const DISCOUNT = 0;

    render(
      <BasketSummaryOrder
        totalPrice={TOTAL_PRICE}
        discount={DISCOUNT}
        defaultDiscount={DEFAULT_DISCOUNT}
        isOrderPosting={false}
        onPostOrder={onPostOrder}
      />
    );

    await userEvent.click(screen.getByText(/Оформить заказ/i));

    expect(onPostOrder).toBeCalledTimes(1);
  });
});
