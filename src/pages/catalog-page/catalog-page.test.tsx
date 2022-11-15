import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { InitialCatalogPriceLimit } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import CatalogPage from './catalog-page';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const store = makeMockStore({
      Cameras: {
        cameras: [],
        totalCount: 0,
        isLoaded: false,
        loadingError: null,
        searchingCameras: [],
      },
      Promo: {
        promo: null,
        isLoaded: false,
        loadingError: null,
      },
      App: {
        currentProduct: null,
        isAddToBasketPopupOpened: false,
        isSuccessAddToBasketPopupOpened: false,
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
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
