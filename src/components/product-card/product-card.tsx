import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { currentProductUpdate, addToBasketPopupStatusUpdate } from '../../store/app-slice/app-slice';
import { Camera } from '../../types/types';
import { AppRoute } from '../../const';
import Rating from '../rating/rating';

type ProductCardProps = {
  product: Camera;
  isActive?: boolean;
  isInBasket?: boolean;
};

function ProductCard({product, isInBasket, isActive}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, price} = product;
  const {id, rating, reviewCount} = product;

  const handleBuyButtonClick = () => {
    dispatch(currentProductUpdate(product));
    dispatch(addToBasketPopupStatusUpdate(true));
  };

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`} data-testid="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={`${previewImg}`} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating
            rating={rating}
            reviewCount={reviewCount}
          />
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isInBasket ? (
          <button
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            type="button"
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </button>
        ) : (
          <button
            onClick={handleBuyButtonClick}
            className="btn btn--purple product-card__btn"
            type="button"
          >
            Купить
          </button>
        )}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
