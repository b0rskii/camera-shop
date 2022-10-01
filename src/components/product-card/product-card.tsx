import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { setCurrentProduct, setIsPopupOpened } from '../../store/app-process/app-process';
import { Camera } from '../../types/camera';
import { MAX_PRODUCT_RATE, AppRoute } from '../../const';
import ProductCardRating from '../product-card-rating/product-card-rating';

type ProductCardProps = {
  product: Camera;
  isActive?: boolean;
};

function ProductCard({product, isActive}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, price} = product;
  const {id, rating, reviewCount} = product;

  const buyButtonClickHandler = () => {
    dispatch(setCurrentProduct(product));
    dispatch(setIsPopupOpened(true));
  };

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <ProductCardRating
          maxRating={MAX_PRODUCT_RATE}
          rating={rating}
          reviewCount={reviewCount}
        />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          onClick={buyButtonClickHandler}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Item}${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
