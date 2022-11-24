import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type BasketIconProps = {
  basketItemsCount: number;
};

function BasketIcon({basketItemsCount}: BasketIconProps): JSX.Element {
  return (
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {basketItemsCount > 0 &&
      <span className="header__basket-count">{basketItemsCount}</span>}
    </Link>
  );
}

export default BasketIcon;
