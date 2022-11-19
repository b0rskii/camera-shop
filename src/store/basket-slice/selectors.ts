import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { BasketItem } from '../../types/types';

export const getBasketItems = (state: State): BasketItem[] => state.Basket.basketItems;
export const getDiscount = (state: State): number => state.Basket.discount;
export const getPromoCode = (state: State): string => state.Basket.promoCode;
export const getOrderPostingStatus = (state: State): boolean => state.Basket.isOrderPosting;
export const getOrderPostingError = (state: State): string | null => state.Basket.postingError;

export const getBasketItemsTotalCount = createSelector(
  getBasketItems,
  (basketItems): number =>
    basketItems.reduce((total: number, item: BasketItem) => total + item.count, 0)
);

export const getBasketItemsTotalPrice = createSelector(
  getBasketItems,
  (basketItems): number =>
    basketItems.reduce((total: number, item: BasketItem) => total + item.value.price * item.count, 0)
);
