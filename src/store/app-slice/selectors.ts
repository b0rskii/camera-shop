import { State } from '../../types/state';
import { Camera } from '../../types/types';

export const getCurrentProduct = (state: State): Camera | null => state.App.currentProduct;
export const getAddToBasketPopupStatus = (state: State): boolean => state.App.isAddToBasketPopupOpened;
export const getPostReviewPopupStatus = (state: State): boolean => state.App.isPostReviewPopupOpened;
export const getSuccessPopupStatus = (state: State): boolean => state.App.isSuccessPopupOpened;
export const getSuccessAddToBasketPopupStatus = (state: State): boolean => state.App.isSuccessAddToBasketPopupOpened;
export const getBasketItemDeletingPopupStatus = (state: State): boolean => state.App.isBasketItemDeletingPopupOpened;
