import { memo, useState, FormEvent, ChangeEvent } from 'react';
import { removeSpaces } from '../../utils/utils';

type BasketPromoCodeProps = {
  appliedPromoCode: string;
  isPromoCodeValid: boolean;
  onApplyPromoCode: (coupon: string) => void;
};

function BasketPromoCode(props: BasketPromoCodeProps): JSX.Element {
  const {appliedPromoCode, isPromoCodeValid, onApplyPromoCode} = props;
  const [promoCode, setPromoCode] = useState(appliedPromoCode);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onApplyPromoCode(promoCode);
  };

  const handleInputValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(removeSpaces(evt.currentTarget.value));
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#" onSubmit={handleFormSubmit}>
          <div className={`
              custom-input
              ${appliedPromoCode.length && isPromoCodeValid ? 'is-valid' : ''}
              ${appliedPromoCode.length && !isPromoCodeValid ? 'is-invalid' : ''}
            `}
          >
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                value={promoCode}
                onChange={handleInputValueChange}
                type="text"
                name="promo"
                placeholder="Введите промокод"
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(BasketPromoCode);
