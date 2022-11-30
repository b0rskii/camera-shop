import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getAddToBasketPopupData } from '../../../store/app-slice/selectors';
import { addToBasketPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import { basketItemAdding } from '../../../store/basket-slice/basket-slice';
import PopupLayout from '../popup-layout/popup-layout';
import BasketItemShort from '../../basket-item-short/basket-item-short';

function AddToBasketPopup(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const {isPopupOpened, product} = useAppSelector(getAddToBasketPopupData);

  if (!product) {
    return null;
  }

  const setIsPopupOpened = (status: boolean) => {
    dispatch(addToBasketPopupStatusUpdate({
      isPopupOpened: status,
      product: null,
    }));
  };

  const handleButtonClick = () => {
    dispatch(basketItemAdding(product.id));
    setIsPopupOpened(false);
  };

  return (
    <PopupLayout
      isPopupOpened={isPopupOpened}
      onSetIsPopupOpened={setIsPopupOpened}
    >
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <BasketItemShort item={product} isWithPrice />
      </div>
      <div className="modal__buttons">
        <button
          onClick={handleButtonClick}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
      </div>
    </PopupLayout>
  );
}

export default AddToBasketPopup;
