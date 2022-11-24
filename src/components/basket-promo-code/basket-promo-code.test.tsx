import { fireEvent, render, screen } from '@testing-library/react';
import BasketPromoCode from './basket-promo-code';

const onApplyPromoCode = jest.fn();

describe('Component: BasketPromoCode', () => {
  it('should render correctly', () => {
    render(
      <BasketPromoCode
        appliedPromoCode=''
        isPromoCodeValid={false}
        onApplyPromoCode={onApplyPromoCode}
      />
    );

    const promoCodeStatusElement = screen.queryByTestId('promo-code-status');

    expect(screen.getByText('Промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i))
      .toBeInTheDocument();

    expect(promoCodeStatusElement).not.toHaveClass('is-valid');
    expect(promoCodeStatusElement).not.toHaveClass('is-invalid');
  });

  it('should render correctly if applied valid promo code', () => {
    const PROMO_CODE = 'promo-code';

    render(
      <BasketPromoCode
        appliedPromoCode={PROMO_CODE}
        isPromoCodeValid
        onApplyPromoCode={onApplyPromoCode}
      />
    );

    expect(screen.getByDisplayValue(PROMO_CODE)).toBeInTheDocument();

    expect(screen.getByTestId('promo-code-status')).toHaveClass('is-valid');
    expect(screen.queryByTestId('promo-code-status')).not.toHaveClass('is-invalid');
  });

  it('should render correctly if applied invalid promo code', () => {
    const PROMO_CODE = 'promo-code';

    render(
      <BasketPromoCode
        appliedPromoCode={PROMO_CODE}
        isPromoCodeValid={false}
        onApplyPromoCode={onApplyPromoCode}
      />
    );

    expect(screen.getByDisplayValue(PROMO_CODE)).toBeInTheDocument();

    expect(screen.getByTestId('promo-code-status')).toHaveClass('is-invalid');
    expect(screen.queryByTestId('promo-code-status')).not.toHaveClass('is-valid');
  });

  it('should called callback when user submit form', () => {
    const PROMO_CODE = 'promo-code';

    render(
      <BasketPromoCode
        appliedPromoCode={PROMO_CODE}
        isPromoCodeValid={false}
        onApplyPromoCode={onApplyPromoCode}
      />
    );

    fireEvent.submit(screen.getByTestId('basket-promo-form'));

    expect(onApplyPromoCode).toBeCalledTimes(1);
  });
});
