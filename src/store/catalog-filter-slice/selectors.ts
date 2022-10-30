import { State } from '../../types/state';

export const getCatalogFilterMinPrice = (state: State): string | null => state.CatalogFilter.minPrice;
export const getCatalogFilterMaxPrice = (state: State): string | null => state.CatalogFilter.maxPrice;
export const getCatalogFilterCategory = (state: State): string[] => state.CatalogFilter.category;
export const getCatalogFilterType = (state: State): string[] => state.CatalogFilter.type;
export const getCatalogFilterLevel = (state: State): string[] => state.CatalogFilter.level;
export const getCatalogFilterMinPriceLimit = (state: State): number => state.CatalogFilter.minPriceLimit;
export const getCatalogFilterMaxPriceLimit = (state: State): number => state.CatalogFilter.maxPriceLimit;
export const getCatalogFilterNearestMinPrice = (state: State): string | null => state.CatalogFilter.nearestMinPrice;
export const getCatalogFilterNearestMaxPrice = (state: State): string | null => state.CatalogFilter.nearestMaxPrice;
