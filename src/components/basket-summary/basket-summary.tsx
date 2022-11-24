import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getBasketItemsTotalPrice,
  getDiscount,
  getOrderPostingStatus,
  getPromoCode
} from '../../store/basket-slice/selectors';
import { promoCodeUpdate } from '../../store/basket-slice/basket-slice';
import { postPromoCodeAction, postOrderAction } from '../../store/api-actions';
import { DEFAULT_DISCOUNT } from '../../const';
import BasketPromoCode from '../basket-promo-code/basket-promo-code';
import BasketSummaryOrder from '../basket-summary-order/basket-summary-order';

function BasketSummary(): JSX.Element {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(getBasketItemsTotalPrice);
  const discount = useAppSelector(getDiscount);
  const appliedPromoCode = useAppSelector(getPromoCode);
  const isOrderPosting = useAppSelector(getOrderPostingStatus);

  const applyPromoCode = useCallback(
    (coupon: string) => {
      dispatch(postPromoCodeAction({coupon}))
        .finally(() => dispatch(promoCodeUpdate(coupon)));
    },
    [dispatch]
  );

  const postOrder = useCallback(
    () => {
      dispatch(postOrderAction());
    },
    [dispatch]
  );

  if (totalPrice === 0) {
    return <h3>Здесь пока ничего нет</h3>;
  }

  return (
    <div className="basket__summary" data-testid="basket-summary">
      <BasketPromoCode
        appliedPromoCode={appliedPromoCode}
        isPromoCodeValid={discount > 0}
        onApplyPromoCode={applyPromoCode}
      />
      <BasketSummaryOrder
        totalPrice={totalPrice}
        discount={discount}
        defaultDiscount={DEFAULT_DISCOUNT}
        isOrderPosting={isOrderPosting}
        onPostOrder={postOrder}
      />
    </div>
  );
}

export default BasketSummary;
