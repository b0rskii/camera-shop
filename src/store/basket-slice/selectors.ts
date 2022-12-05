import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { BasketItem, Camera, TPromoCodeValidationStatus } from '../../types/types';
import { adaptCamerasToClient } from '../../utils/utils';

const selectBasketCameras = (state: State): Camera[] => state.Basket.cameras;

export const getBasketItems = (state: State): BasketItem[] => state.Basket.basketItems;
export const getDiscount = (state: State): number => state.Basket.discount;
export const getPromoCode = (state: State): string => state.Basket.promoCode;
export const getPromoCodeValidationStatus = (state: State): TPromoCodeValidationStatus => state.Basket.promoCodeValidationStatus;
export const getOrderPostingStatus = (state: State): boolean => state.Basket.isOrderPosting;
export const getOrderPostingError = (state: State): string | null => state.Basket.postingError;
export const getBasketCamerasLoadingStatus = (state: State): boolean => state.Basket.isCamerasLoading;
export const getBasketCamerasLoadingError = (state: State): string | null => state.Basket.camerasLoadingError;


export const getBasketCameras = createSelector(
  selectBasketCameras,
  (cameras): Camera[] => adaptCamerasToClient(cameras)
);

export const getBasketItemsTotalCount = createSelector(
  getBasketItems,
  (basketItems): number =>
    basketItems.reduce((total: number, item: BasketItem) => total + item.count, 0)
);

export const getBasketItemsTotalPrice = createSelector(
  getBasketItems,
  getBasketCameras,
  (basketItems, basketCameras): number => {
    if (basketItems.length !== basketCameras.length) {
      return 0;
    }

    return basketItems.reduce((total: number, item: BasketItem, i) => total + basketCameras[i].price * item.count, 0);
  }
);
