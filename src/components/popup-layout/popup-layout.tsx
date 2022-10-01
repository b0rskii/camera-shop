import { PropsWithChildren } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getPopupStatus } from '../../store/app-process/selectors';
import { setIsPopupOpened } from '../../store/app-process/app-process';

function PopupLayout({children}: PropsWithChildren): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getPopupStatus);

  if (!isPopupOpened) {
    return null;
  }

  const closeButtonClickHandler = () => {
    dispatch(setIsPopupOpened(false));
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          {children}
          <button
            onClick={closeButtonClickHandler}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupLayout;
