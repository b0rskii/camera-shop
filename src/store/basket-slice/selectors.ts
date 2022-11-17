import { State } from '../../types/state';
import { BasketItem } from '../../types/types';

export const getBasketItems = (state: State): BasketItem[] => state.Basket.basketItems;
export const getBasketItemsTotalCount = (state: State): number =>
  state.Basket.basketItems.reduce((total: number, item: BasketItem) => total + item.count, 0);
