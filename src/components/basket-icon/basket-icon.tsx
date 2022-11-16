import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { getBasketItems } from '../../store/basket-slice/selectors';
import { AppRoute } from '../../const';

function BasketIcon() {
  const basketItems = useAppSelector(getBasketItems);
  const basketItemsCount = basketItems.length;

  return (
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {basketItemsCount &&
      <span className="header__basket-count">{basketItemsCount}</span>}
    </Link>
  );
}

export default BasketIcon;
