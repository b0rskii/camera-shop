import { useAppSelector } from '../../hooks/hooks';
import { getBasketItemsTotalCount } from '../../store/basket-slice/selectors';
import BasketIcon from './basket-icon';

function BasketIconContainer() {
  const basketItemsCount = useAppSelector(getBasketItemsTotalCount);

  return <BasketIcon basketItemsCount={basketItemsCount} />;
}

export default BasketIconContainer;
