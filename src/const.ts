export const CARDS_PER_PAGE_COUNT = 9;
export const INITIAL_CATALOG_PAGE_NUMBER = 1;
export const MAX_PRODUCT_RATE = 5;
export const DISPLAYED_SLIDER_ITEMS_COUNT = 3;
export const DEFAULT_DISPLAYED_REVIEWS_COUNT = 3;
export const COMMENT_MIN_LENGTH = 5;
export const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка. Попробуйте повторить попытку.';
export const DEFAULT_DISCOUNT = 0;

export const KeyName = {
  Esc: 'Escape',
  Tab: 'Tab',
  Enter: 'Enter',
} as const;

export const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  Product: '/product/',
  ProductId: '/product/:id/*',
  Basket: '/basket',
} as const;

export const AppQuery = {
  CameraName: 'name',
  CatalogPage: 'page',
  CatalogSort: 'sort',
  CatalogSortOrder: 'order',
  CatalogPriceFilter: 'price',
  CatalogMinPriceFilter: 'min_price',
  CatalogMaxPriceFilter: 'max_price',
  CatalogCategoryFilter: 'category',
  CatalogTypeFilter: 'type',
  CatalogLevelFilter: 'level',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo',
  Similar: '/similar',
  Reviews: '/reviews',
  Coupons: '/coupons',
  Orders: '/orders',
} as const;

export const APIQuery = {
  Start: '_start',
  Limit: '_limit',
  Sort: '_sort',
  Order: '_order',
  Like: '_like',
  Min: '_gte',
  Max: '_lte',
} as const;

export const SortOrder = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export const NameSpace = {
  Cameras: 'Cameras',
  Promo: 'Promo',
  CurrentCamera: 'CurrentCamera',
  SimilarCameras: 'SimilarCameras',
  Reviews: 'Reviews',
  Error: 'Error',
  App: 'App',
  CatalogPagination: 'CatalogPagination',
  CatalogSort: 'CatalogSort',
  CatalogFilter: 'CatalogFilter',
  Basket: 'Basket',
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
  PostOrderSuccess: 'Спасибо за покупку',
} as const;

export const InitialCatalogPriceLimit = {
  Min: 0,
  Max: Infinity,
};
