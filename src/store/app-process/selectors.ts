import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCurrentCatalogPage = (state: State): number => state[NameSpace.App].currentCatalogPage;
