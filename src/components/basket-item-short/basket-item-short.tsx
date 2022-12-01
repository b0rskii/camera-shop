import { memo } from 'react';
import { Camera } from '../../types/types';

type BasketItemShortProps = {
  item: Camera;
  isWithPrice?: boolean;
};

function BasketItemShort({item, isWithPrice}: BasketItemShortProps): JSX.Element {
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name} = item;
  const {vendorCode, category, type, level, price} = item;

  return (
    <>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={`${previewImg}`} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name} />
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
        {isWithPrice &&
        <p className="basket-item__price" data-testid="basket-item-price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>}
      </div>
    </>
  );
}

export default memo(BasketItemShort);
