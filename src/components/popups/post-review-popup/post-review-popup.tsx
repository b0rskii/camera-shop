import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getPostReviewPopupStatus } from '../../../store/app-slice/selectors';
import { postReviewPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import PopupLayout from '../popup-layout/popup-layout';
import PostReviewForm from '../../forms/post-review-form/post-review-form';

function PostReviewPopup(): JSX.Element {
  const dispatch = useAppDispatch();
  const isPopupOpened = useAppSelector(getPostReviewPopupStatus);

  const setIsPopupOpened = (status: boolean) => {
    dispatch(postReviewPopupStatusUpdate(status));
  };

  return (
    <PopupLayout
      isPopupOpened={isPopupOpened}
      onSetIsPopupOpened={setIsPopupOpened}
    >
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <PostReviewForm />
      </div>
    </PopupLayout>
  );
}

export default PostReviewPopup;
