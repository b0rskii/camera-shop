type BasketSummaryOrderProps = {
  totalPrice: number;
  discount: number;
  defaultDiscount: number;
  isOrderPosting: boolean;
  onPostOrder: () => void;
};

function BasketSummaryOrder(props: BasketSummaryOrderProps): JSX.Element {
  const {totalPrice, discount, defaultDiscount, isOrderPosting, onPostOrder} = props;
  const discountPrice = totalPrice * discount / 100;

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalPrice.toLocaleString()} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span
          className={`basket__summary-value ${discount === defaultDiscount ? '' : 'basket__summary-value--bonus'}`}
          data-testid="basket-summary-value"
        >
          {discountPrice.toLocaleString()} ₽
        </span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{(totalPrice - discountPrice).toLocaleString()} ₽</span>
      </p>
      <button
        onClick={onPostOrder}
        className="btn btn--purple"
        type="button"
        disabled={isOrderPosting}
      >
        Оформить заказ
      </button>
    </div>
  );
}

export default BasketSummaryOrder;
