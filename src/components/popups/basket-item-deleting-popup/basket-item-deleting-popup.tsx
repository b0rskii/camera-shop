import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getBasketItemDeletingPopupStatus, getCurrentProduct } from '../../../store/app-slice/selectors';
import { basketItemDeletingPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import { basketItemRemoving } from '../../../store/basket-slice/basket-slice';
import PopupLayout from '../popup-layout/popup-layout';

function BasketItemDeletingPopup(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getBasketItemDeletingPopupStatus);
  const product = useAppSelector(getCurrentProduct);

  if (!product) {
    return null;
  }

  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x} = product;
  const {name, vendorCode, type, category, level, id} = product;

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
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
            <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="140" height="120" alt={name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{`${type} ${category.toLowerCase()}`}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
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
