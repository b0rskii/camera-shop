import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { makeMockCameras } from '../../utils/mocks';
import { InitialCatalogPriceLimit } from '../../const';
import HistoryRouter from '../history-router/history-router';
import CatalogContent from './catalog-content';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: CatalogContent', () => {
  it('should render component correctly', () => {
    const CAMERAS_TOTAL_COUNT = 50;
    const cameras = makeMockCameras();
    const store = makeMockStore({
      Cameras: {
        cameras: cameras,
        totalCount: CAMERAS_TOTAL_COUNT,
        isLoaded: true,
        searchingCameras: [],
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
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogContent />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();
  });
});
