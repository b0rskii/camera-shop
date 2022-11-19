import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getBasketItemDeletingPopupStatus, getCurrentProduct } from '../../../store/app-slice/selectors';
import { basketItemDeletingPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import { basketItemRemoving } from '../../../store/basket-slice/basket-slice';
import PopupLayout from '../popup-layout/popup-layout';
import BasketItemShort from '../../basket-item-short/basket-item-short';

function BasketItemDeletingPopup(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getBasketItemDeletingPopupStatus);
  const product = useAppSelector(getCurrentProduct);

  if (!product) {
    return null;
  }

  const {id} = product;

  const setIsPopupOpened = (status: boolean) => {
    dispatch(basketItemDeletingPopupStatusUpdate(status));
  };

  const handleDeleteButtonClick = () => {
    dispatch(basketItemRemoving(id));
    setIsPopupOpened(false);
  };

  const handleContinueShoppingButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    setIsPopupOpened(false);
  };

  return (
    <PopupLayout
      isPopupOpened={isPopupOpened}
      onSetIsPopupOpened={setIsPopupOpened}
    >
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <BasketItemShort item={product} />
      </div>
      <div className="modal__buttons">
        <button
          onClick={handleDeleteButtonClick}
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
        >
          Удалить
        </button>
        <a
          onClick={handleContinueShoppingButtonClick}
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="0"
        >
          Продолжить покупки
        </a>
      </div>
    </PopupLayout>
  );
}

export default BasketItemDeletingPopup;
