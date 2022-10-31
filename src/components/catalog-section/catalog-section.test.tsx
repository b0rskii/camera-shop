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
import CatalogSection from './catalog-section';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: CatalogSection', () => {
  it('should render correctly', () => {
    const store = makeMockStore({
      Cameras: {
        cameras: [],
        totalCount: 0,
        isLoaded: false,
        searchingCameras: [],
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
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSection />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
