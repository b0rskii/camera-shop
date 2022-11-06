import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { api } from '../../store/store';
import { Action } from '@reduxjs/toolkit';
import { Camera } from '../../types/types';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { makeMockCameras } from '../../utils/mocks';
import { InitialCatalogPriceLimit } from '../../const';
import HistoryRouter from '../history-router/history-router';
import ProductsList from './products-list';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

const store = makeMockStore({
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
});

describe('Component: ProductsList', () => {
  it('should render component correctly if loaded without error', () => {
    const START_ITEM_NUMBER = 1;
    const cameras = makeMockCameras();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductsList
            products={cameras}
            isProductsLoaded
            startItemNumber={START_ITEM_NUMBER}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('product-card')).toHaveLength(cameras.length);
  });

  it('should render loader component if data not loaded', () => {
    const START_ITEM_NUMBER = 1;
    const cameras: Camera[] = [];

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductsList
            products={cameras}
            isProductsLoaded={false}
            startItemNumber={START_ITEM_NUMBER}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
