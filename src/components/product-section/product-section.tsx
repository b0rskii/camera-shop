import { memo } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { addToBasketPopupStatusUpdate } from '../../store/app-slice/app-slice';
import { Camera } from '../../types/types';
import Rating from '../../components/rating/rating';
import ProductTabs from '../../components/product-tabs/product-tabs';

type ProductSectionProps = {
  camera: Camera;
};

function ProductSection({camera}: ProductSectionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name} = camera;
  const {rating, reviewCount, price} = camera;

  const handleAddToBasketButtonClick = () => {
    dispatch(addToBasketPopupStatusUpdate({
      isPopupOpened: true,
      product: camera,
    }));
  };

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
              <img src={`${previewImg}`} srcSet={`${previewImg2x} 2x`} width="560" height="480" alt={name} />
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
              onClick={handleAddToBasketButtonClick}
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
  );
}

export default memo(ProductSection);
