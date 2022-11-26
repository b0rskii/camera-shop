import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getBasketCameras,
  getBasketItems
} from '../../store/basket-slice/selectors';
import { basketItemsCountUpdate } from '../../store/basket-slice/basket-slice';
import { currentProductUpdate, basketItemDeletingPopupStatusUpdate } from '../../store/app-slice/app-slice';
import { Camera } from '../../types/types';
import BasketItem from '../basket-item/basket-item';

const BasketItemsCount = {
  Min: 1,
  Max: 99,
} as const;

function BasketItemsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getBasketCameras);
  const basketItems = useAppSelector(getBasketItems);

  const removeBasketItem = useCallback(
    (product: Camera) => {
      dispatch(currentProductUpdate(product));
      dispatch(basketItemDeletingPopupStatusUpdate(true));
    },
    [dispatch]
  );

  const updateItemsCount = useCallback(
    (id: number, value: number) => dispatch(basketItemsCountUpdate({id, value})),
    [dispatch]
  );

  return (
    <ul className="basket__list" data-testid="basket-list">
      {cameras.map((item, i) => (
        <BasketItem
          item={item}
          itemsCount={basketItems[i].count}
          minItemsCount={BasketItemsCount.Min}
          maxItemsCount={BasketItemsCount.Max}
          onRemoveButtonClick={removeBasketItem}
          onCounterChange={updateItemsCount}
          key={item.id}
        />
      ))}
    </ul>
  );
}

export default BasketItemsList;
