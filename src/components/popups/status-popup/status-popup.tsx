import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getStatusPopupStatus } from '../../../store/app-process/selectors';
import { setIsStatusPopupOpened } from '../../../store/app-process/app-process';
import PopupLayout from '../popup-layout/popup-layout';

type StatusPopupProps = {
  title: string;
};

function StatusPopup({title}: StatusPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getStatusPopupStatus);

  const setIsPopupOpened = (status: boolean) => {
    dispatch(setIsStatusPopupOpened(status));
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
          onClick={() => dispatch(setIsStatusPopupOpened(false))}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
    </PopupLayout>
  );
}

export default StatusPopup;
