import { useAppSelector } from '../../hooks';
import { getCurrentProduct } from '../../store/app-process/selectors';
import PopupLayout from '../popup-layout/popup-layout';

function PopupAddToBasket(): JSX.Element | null {
  const product = useAppSelector(getCurrentProduct);

  if (!product) {
    return null;
  }

  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x} = product;
  const {name, vendorCode, type, category, level, price} = product;

  return (
    <PopupLayout>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
            <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{`${type} ${category.toLowerCase()}`}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{price} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
      </div>
    </PopupLayout>
  );
}

export default PopupAddToBasket;
