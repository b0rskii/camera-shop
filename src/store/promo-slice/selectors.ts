import { State } from '../../types/state';
import { Promo } from '../../types/types';

export const getPromo = (state: State): Promo | null => state.Promo.promo;
export const getPromoLoadingStatus = (state: State): boolean => state.Promo.isLoaded;
export const getPromoLoadingError = (state: State): string | null => state.Promo.loadingError;
