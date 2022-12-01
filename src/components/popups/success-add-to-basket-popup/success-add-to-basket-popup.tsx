import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getSuccessAddToBasketPopupStatus } from '../../../store/app-slice/selectors';
import { successAddToBasketPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import { AppRoute } from '../../../const';
import PopupLayout from '../popup-layout/popup-layout';

function SuccessAddToBasketPopup(): JSX.Element {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getSuccessAddToBasketPopupStatus);
  const {pathname} = useLocation();

  const setIsPopupOpened = (status: boolean) => {
    dispatch(successAddToBasketPopupStatusUpdate(status));
  };

  const handleContinueShoppingButtonClick = (evt: MouseEvent) => {
    setIsPopupOpened(false);

    if (pathname === AppRoute.Catalog) {
      evt.preventDefault();
    }
  };

  const handleMoveToBasketButtonClick = () => {
    setIsPopupOpened(false);
    document.body.scrollIntoView();
  };

  return (
    <PopupLayout
      isPopupOpened={isPopupOpened}
      onSetIsPopupOpened={setIsPopupOpened}
    >
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link
          onClick={(evt) => handleContinueShoppingButtonClick(evt)}
          to={AppRoute.Catalog}
          className="btn btn--transparent modal__btn"
        >
          Продолжить покупки
        </Link>
        <Link
          to={AppRoute.Basket}
          onClick={handleMoveToBasketButtonClick}
          className="btn btn--purple modal__btn modal__btn--fit-width"
        >
          Перейти в корзину
        </Link>
      </div>
    </PopupLayout>
  );
}

export default SuccessAddToBasketPopup;
