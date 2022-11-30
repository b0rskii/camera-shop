import { State } from '../../types/state';
import { BasketItemDeletingPopupData, AddToBasketPopupData } from '../../types/types';

export const getPostReviewPopupStatus = (state: State): boolean => state.App.isPostReviewPopupOpened;
export const getSuccessPopupStatus = (state: State): boolean => state.App.isSuccessPopupOpened;
export const getSuccessAddToBasketPopupStatus = (state: State): boolean => state.App.isSuccessAddToBasketPopupOpened;

export const getAddToBasketPopupData = (state: State): AddToBasketPopupData => ({
  isPopupOpened: state.App.isAddToBasketPopupOpened,
  product: state.Cameras.selectedCamera,
});

export const getBasketItemDeletingPopupData = (state: State): BasketItemDeletingPopupData => ({
  isPopupOpened: state.App.isBasketItemDeletingPopupOpened,
  basketItem: state.Basket.selectedBasketItem,
});
