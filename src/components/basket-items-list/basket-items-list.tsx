import { useAppSelector } from '../../hooks/hooks';
import { getBasketItems } from '../../store/basket-slice/selectors';
import BasketItem from '../basket-item/basket-item';

function BasketItemsList(): JSX.Element {
  const items = useAppSelector(getBasketItems);

  return (
    <ul className="basket__list">
      {items.map((item) => (
        <BasketItem
          item={item}
          key={item.id}
        />
      ))}
    </ul>
  );
}

export default BasketItemsList;
