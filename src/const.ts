export const CARDS_PER_PAGE_COUNT = 9;
export const INITIAL_CATALOG_PAGE_NUMBER = 1;
export const CATALOG_PAGE_QUERY = 'page';
export const MAX_PRODUCT_RATE = 5;
export const DISPLAYED_SLIDER_ITEMS_COUNT = 3;
export const DEFAULT_DISPLAYED_REVIEWS_COUNT = 3;

export const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  Item: '/item/',
  ItemId: '/item/:id/*',
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

export const BreadCrumb = {
  Main: {
    Name: 'Главная',
    Path: AppRoute.Main,
  },
  Catalog: {
    Name: 'Каталог',
    Path: AppRoute.Catalog,
  },
  Basket: {
    Name: 'Корзина',
    Path: AppRoute.Basket,
  },
} as const;

export const PreviousBreadCrumbs = {
  Catalog: [
    BreadCrumb.Main
  ],
  Item: [
    BreadCrumb.Main,
    BreadCrumb.Catalog
  ],
  Basket: [
    BreadCrumb.Main,
    BreadCrumb.Catalog
  ],
} as const;

export const ProductTab = {
  Characteristics: {
    Name: 'Характеристики',
    Path: 'characteristics',
  },
  Description: {
    Name: 'Описание',
    Path: 'description',
  },
} as const;
