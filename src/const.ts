export const CARDS_PER_PAGE_COUNT = 9;
export const INITIAL_CATALOG_PAGE_NUMBER = 1;
export const MAX_PRODUCT_RATE = 5;
export const DISPLAYED_SLIDER_ITEMS_COUNT = 3;
export const DEFAULT_DISPLAYED_REVIEWS_COUNT = 3;
export const COMMENT_MIN_LENGTH = 5;
export const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка. Попробуйте повторить попытку.';

export const KeyName = {
  Esc: 'Escape',
  Tab: 'Tab',
} as const;

export const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  Product: '/product/',
  ProductId: '/product/:id/*',
  Basket: '/basket',
} as const;

export const AppQuery = {
  CatalogPage: 'page',
  CatalogSort: 'sort',
  CatalogSortOrder: 'order',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo',
  Similar: '/similar',
  Reviews: '/reviews',
} as const;

export const APIQuery = {
  Start: '_start',
  Limit: '_limit',
  Sort: '_sort',
  Order: '_order',
  DescSort: '_order=desc',
  Like: '_like',
} as const;

export const NameSpace = {
  Cameras: 'Cameras',
  Promo: 'Promo',
  CurrentCamera: 'CurrentCamera',
  SimilarCameras: 'SimilarCameras',
  Reviews: 'Reviews',
  Error: 'Error',
  App: 'App',
  Sort: 'Sort',
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
  Product: [
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

export const RatingInput = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;

export const StatusMessage = {
  PostReviewSuccess: 'Спасибо за отзыв',
} as const;
