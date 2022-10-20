import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getSuccessPopupStatus } from '../../../store/app-slice/selectors';
import { successPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import PopupLayout from '../popup-layout/popup-layout';

type SuccessPopupProps = {
  title: string;
};

function SuccessPopup({title}: SuccessPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getSuccessPopupStatus);

  const setIsPopupOpened = (status: boolean) => {
    dispatch(successPopupStatusUpdate(status));
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
          onClick={() => dispatch(successPopupStatusUpdate(false))}
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
