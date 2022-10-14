import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { makeMockCamera, makeMockCameras } from '../../utils/mocks';
import { AppRoute } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import App from './app';

const DEFAULT_ERROR = 'error';
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
  Data: {
    cameras: cameras,
    camerasTotalCount: CAMERAS_TOTAL_COUNT,
    isCamerasLoaded: true,
    camerasLoadingError: null,

    promo: null,
    isPromoLoaded: false,
    promoLoadingError: null,

    currentCamera: camera,
    isCurrentCameraLoaded: true,
    currentCameraLoadingError: null,

    similarCameras: [],
    isSimilarCamerasLoaded: false,
    similarCamerasLoadingError: null,

    reviews: [],
    isReviewsLoaded: false,
    reviewsLoadingError: null,

    error: null,
    defaultError: DEFAULT_ERROR,
  },
  App: {
    currentProduct: null,
    isAddToBasketPopupOpened: false,
    isPostReviewPopupOpened: false,
    isSuccessPopupOpened: false,
  }
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

  it('should render not found page when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
