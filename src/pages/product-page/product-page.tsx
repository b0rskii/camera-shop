import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCurrentCameraAction } from '../../store/api-actions';
import {
  getCurrentCamera,
  getCurrentCameraLoadingStatus,
  getCurrentCameraLoadingError
} from '../../store/current-camera-slice/selectors';
import { PreviousBreadCrumbs, StatusMessage } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductSection from '../../components/product-section/product-section';
import SimilarSection from '../../components/similar-section/similar-section';
import ReviewSection from '../../components/review-section/review-section';
import AddToBasketPopup from '../../components/popups/add-to-basket-popup/add-to-basket-popup';
import UpButton from '../../components/up-button/up-button';
import PostReviewPopup from '../../components/popups/post-review-popup/post-review-popup';
import SuccessPopup from '../../components/popups/success-popup/success-popup';
import SuccessAddToBasketPopup from '../../components/popups/success-add-to-basket-popup/success-add-to-basket-popup';
import Loader from '../../components/loader/loader';
import Error from '../../components/error/error';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const camera = useAppSelector(getCurrentCamera);
  const isCameraLoaded = useAppSelector(getCurrentCameraLoadingStatus);
  const cameraLoadingError = useAppSelector(getCurrentCameraLoadingError);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && id) {
      dispatch(fetchCurrentCameraAction(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (cameraLoadingError) {
    return <Error />;
  }

  if (!isCameraLoaded || camera === null || !id) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <main data-testid="product-page">
        <div className="page-content">
          <BreadCrumbs
            previousBreadCrumbs={PreviousBreadCrumbs.Product}
            currentBreadCrumbName={camera.name}
          />
          <ProductSection camera={camera} />
          <SimilarSection id={id} />
          <ReviewSection id={id} />
        </div>
        <AddToBasketPopup />
        <PostReviewPopup />
        <SuccessPopup title={StatusMessage.PostReviewSuccess} />
        <SuccessAddToBasketPopup />
      </main>
      <UpButton />
    </MainLayout>
  );
}

export default ProductPage;
