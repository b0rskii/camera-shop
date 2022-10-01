export const CARDS_PER_PAGE_COUNT = 9;
export const INITIAL_CATALOG_PAGE_NUMBER = 1;
export const CATALOG_PAGE_QUERY = 'page';
export const MAX_PRODUCT_RATE = 5;
export const DISPLAYED_SLIDER_ITEMS_COUNT = 3;
export const DEFAULT_DISPLAYED_REVIEWS_COUNT = 3;

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
  Similar: '/similar',
  Reviews: '/reviews',
} as const;

export const NameSpace = {
  Data: 'Data',
  App: 'App',
} as const;
