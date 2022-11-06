import { State } from '../../types/state';

export const getCatalogPage = (state: State): string | null => state.CatalogPagination.currentPage;
