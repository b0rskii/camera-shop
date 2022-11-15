import { State } from '../../types/state';
import { Camera } from '../../types/types';

export const getBasketItems = (state: State): Camera[] => state.Basket.basketItems;
