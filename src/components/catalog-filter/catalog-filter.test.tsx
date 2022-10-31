import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { InitialCatalogPriceLimit } from '../../const';
import HistoryRouter from '../history-router/history-router';
import CatalogFilter from './catalog-filter';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {
  const store = makeMockStore({
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

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogFilter />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
  });
});
