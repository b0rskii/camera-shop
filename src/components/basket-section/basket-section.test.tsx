import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { api } from '../../store/store';
import { Action } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';
import BasketSection from './basket-section';
import { makeMockBasketItems, makeMockCameras } from '../../utils/mocks';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: BasketSection', () => {
  it('should render loader if data is loading', () => {
    const store = makeMockStore({
      Basket: {
        basketItems: [],
        isCamerasLoading: true,
        camerasLoadingError: null,
      },
    });

    render(
      <Provider store={store}>
        <BasketSection />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render error if data loaded with error', () => {
    const ERROR = '400';
    const store = makeMockStore({
      Basket: {
        basketItems: [],
        isCamerasLoading: false,
        camerasLoadingError: ERROR,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketSection />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('should render empty basket message if basket is empty', () => {
    const store = makeMockStore({
      Basket: {
        basketItems: [],
        isCamerasLoading: false,
        camerasLoadingError: null,
      },
    });

    render(
      <Provider store={store}>
        <BasketSection />
      </Provider>
    );

    expect(screen.getByText(/Здесь пока ничего нет/i)).toBeInTheDocument();
  });

  it('should render basket content if basket is not empty', () => {
    const basketItems = makeMockBasketItems(2);
    const cameras = makeMockCameras(2);
    const store = makeMockStore({
      Basket: {
        basketItems,
        cameras,
        isCamerasLoading: false,
        camerasLoadingError: null,
        promoCode: ''
      },
    });

    render(
      <Provider store={store}>
        <BasketSection />
      </Provider>
    );

    expect(screen.getByTestId('basket-list')).toBeInTheDocument();
    expect(screen.getByTestId('basket-summary')).toBeInTheDocument();
  });
});
