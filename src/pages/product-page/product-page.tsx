import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentProduct, setIsAddToBasketPopupOpened } from '../../store/app-process/app-process';
import { fetchCurrentCameraAction } from '../../store/api-actions';
import { getCurrentCamera, getCurrentCameraLoadingStatus } from '../../store/data-process/selectors';
import { PreviousBreadCrumbs, StatusMessage } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductTabs from '../../components/product-tabs/product-tabs';
import SimilarSection from '../../components/similar-section/similar-section';
import ReviewSection from '../../components/review-section/review-section';
import Rating from '../../components/rating/rating';
import PopupAddToBasket from '../../components/popup-add-to-basket/popup-add-to-basket';
import UpButton from '../../components/up-button/up-button';
import PopupPostReview from '../../components/popup-post-review/popup-post-review';
import PopupStatus from '../../components/popup-status/popup-status';
import Loader from '../../components/loader/loader';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const camera = useAppSelector(getCurrentCamera);
  const isCameraLoaded = useAppSelector(getCurrentCameraLoadingStatus);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && id) {
      dispatch(fetchCurrentCameraAction(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (!isCameraLoaded || camera === null || !id) {
    return <Loader />;
  }

  const addToBasketButtonClickHandler = () => {
    dispatch(setCurrentProduct(camera));
    dispatch(setIsAddToBasketPopupOpened(true));
  };

  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name} = camera;
  const {rating, reviewCount, price} = camera;

  return (
    <MainLayout>
      <main>
        <div className="page-content">
          <BreadCrumbs
            previousBreadCrumbs={PreviousBreadCrumbs.Item}
            currentBreadCrumbName={name}
          />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                    <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt={name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <Rating
                      rating={rating}
                      reviewCount={reviewCount}
                    />
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
                  </p>
                  <button
                    onClick={addToBasketButtonClickHandler}
                    className="btn btn--purple"
                    type="button"
                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <ProductTabs product={camera} />
                </div>
              </div>
            </section>
          </div>
          <SimilarSection id={id} />
          <ReviewSection id={id} />
        </div>
        <PopupAddToBasket />
        <PopupPostReview />
        <PopupStatus title={StatusMessage.PostReviewSuccess} />
      </main>
      <UpButton />
    </MainLayout>
  );
}

export default ProductPage;
