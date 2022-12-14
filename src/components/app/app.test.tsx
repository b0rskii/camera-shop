import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { makeMockCamera, makeMockCameras } from '../../utils/mocks';
import { AppRoute, InitialCatalogPriceLimit } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import App from './app';

const DEFAULT_DISCOUNT = 0;
const CAMERAS_TOTAL_COUNT = 50;
const ID = 1;

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

const camera = makeMockCamera();
const cameras = makeMockCameras();

const store = makeMockStore({
  Cameras: {
    cameras: cameras,
    totalCount: CAMERAS_TOTAL_COUNT,
    isLoaded: true,
    loadingError: null,
    searchingCameras: [],
  },
  Promo: {
    promo: null,
    isLoaded: false,
    loadingError: null,
  },
  CurrentCamera: {
    currentCamera: camera,
    isLoaded: true,
    loadingError: null,
  },
  SimilarCameras: {
    similarCameras: [],
    isLoaded: false,
    loadingError: null,
  },
  Reviews: {
    reviews: [],
    isLoaded: false,
    loadingError: null,
  },
  Error: {
    error: null,
  },
  App: {
    isAddToBasketPopupOpened: false,
    isPostReviewPopupOpened: false,
    isSuccessPopupOpened: false,
    isSuccessAddToBasketPopupOpened: false,
    isBasketItemDeletingPopupOpened: false,
  },
  CatalogPagination: {
    currentPage: null,
  },
  CatalogSort: {
    sort: null,
    order: null,
  },
  CatalogFilter: {
    minPrice: null,
    maxPrice: null,
    category: [],
    type: [],
    level: [],
    minPriceLimit: InitialCatalogPriceLimit.Min,
    maxPriceLimit: InitialCatalogPriceLimit.Max,
    nearestMinPrice: null,
    nearestMaxPrice: null,
  },
  Basket: {
    basketItems: [],
    cameras: [],
    isCamerasLoading: false,
    camerasLoadingError: null,
    discount: DEFAULT_DISCOUNT,
    promoCode: '',
    isOrderPosting: false,
    postingError: null,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Component: App', () => {
  it('should render catalog page when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);

    render(fakeApp);

    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });

  it('should render product page when user navigate to "/product/:id"', () => {
    history.push(`${AppRoute.Product}${ID}`);

    render(fakeApp);

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });

  it('should render basket page when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByTestId('basket-page')).toBeInTheDocument();
  });

  it('should render error page when user navigate to "/error"', () => {
    history.push(AppRoute.Error);

    render(fakeApp);

    expect(screen.getByText(/?????????????????? ????????????/i)).toBeInTheDocument();
    expect(screen.getByText(/?????????????????? ??????????/i)).toBeInTheDocument();
  });

  it('should render not found page when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/???????????????? ???? ??????????????/i)).toBeInTheDocument();
  });
});
