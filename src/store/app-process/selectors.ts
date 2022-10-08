import { State } from '../../types/state';
import { Camera } from '../../types/types';
import { NameSpace } from '../../const';

export const getCurrentProduct = (state: State): Camera | null => state[NameSpace.App].currentProduct;
export const getAddToBasketPopupStatus = (state: State): boolean => state[NameSpace.App].isAddToBasketPopupOpened;
export const getPostReviewPopupStatus = (state: State): boolean => state[NameSpace.App].isPostReviewPopupOpened;
export const getStatusPopupStatus = (state: State): boolean => state[NameSpace.App].isStatusPopupOpened;
