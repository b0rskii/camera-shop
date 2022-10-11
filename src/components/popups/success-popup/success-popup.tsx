import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getSuccessPopupStatus } from '../../../store/app-process/selectors';
import { setIsSuccessPopupOpened } from '../../../store/app-process/app-process';
import PopupLayout from '../popup-layout/popup-layout';

type SuccessPopupProps = {
  title: string;
};

function SuccessPopup({title}: SuccessPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getSuccessPopupStatus);

  const setIsPopupOpened = (status: boolean) => {
    dispatch(setIsSuccessPopupOpened(status));
  };

  return (
    <PopupLayout
      isPopupOpened={isPopupOpened}
      onSetIsPopupOpened={setIsPopupOpened}
    >
      <p className="title title--h4">{title}</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          onClick={() => dispatch(setIsSuccessPopupOpened(false))}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
    </PopupLayout>
  );
}

export default SuccessPopup;