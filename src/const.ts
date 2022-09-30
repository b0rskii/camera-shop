export const CARDS_PER_PAGE_COUNT = 9;
export const INITIAL_CATALOG_PAGE_NUMBER = 1;
export const PAGE_QUERY = 'page=';
export const PAGE_QUERY_REG_EXP = /page=[0-9]+/;

export const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  CatalogPage: '/catalog/:page',
  Item: '/item/',
  ItemId: '/item/:id',
  Basket: '/basket',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo',
} as const;

export const NameSpace = {
  Data: 'Data',
  App: 'App',
} as const;
