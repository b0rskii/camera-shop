import { State } from '../../types/state';
import { Camera } from '../../types/camera';
import { NameSpace } from '../../const';

export const getCurrentProduct = (state: State): Camera | null => state[NameSpace.App].currentProduct;
export const getPopupStatus = (state: State): boolean => state[NameSpace.App].isPopupOpened;
