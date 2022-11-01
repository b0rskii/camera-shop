import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../../store/store';
import { State } from '../../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import {
  catalogFilterMinPriceUpdate,
  catalogFilterMaxPriceUpdate
} from '../../../store/catalog-filter-slice/catalog-filter-slice';
import { InitialCatalogPriceLimit } from '../../../const';
import PriceFilter from './price-filter';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    const store = makeMockStore({
      CatalogFilter: {
        minPrice: null,
        maxPrice: null,
        minPriceLimit: InitialCatalogPriceLimit.Min,
        maxPriceLimit: InitialCatalogPriceLimit.Max,
        nearestMinPrice: null,
        nearestMaxPrice: null,
      },
    });

    render(
      <Provider store={store}>
        <PriceFilter />
      </Provider>
    );

    expect(screen.getByText(/Цена,/i)).toBeInTheDocument();
    expect(screen.getByTestId('min-price-input')).toBeInTheDocument();
    expect(screen.getByTestId('max-price-input')).toBeInTheDocument();
  });

  it('should render correctly with entered price', () => {
    const MIN_PRICE = '1000';
    const MAX_PRICE = '5000';

    const store = makeMockStore({
      CatalogFilter: {
        minPrice: MIN_PRICE,
        maxPrice: MAX_PRICE,
        minPriceLimit: InitialCatalogPriceLimit.Min,
        maxPriceLimit: InitialCatalogPriceLimit.Max,
        nearestMinPrice: null,
        nearestMaxPrice: null,
      },
    });

    render(
      <Provider store={store}>
        <PriceFilter />
      </Provider>
    );

    expect(screen.getByTestId('min-price-input')).toHaveValue(Number(MIN_PRICE));
    expect(screen.getByTestId('max-price-input')).toHaveValue(Number(MAX_PRICE));
  });

  it('should render correctly with nearest prices', () => {
    const MIN_PRICE = '1000';
    const MAX_PRICE = '5000';
    const NEAREST_MIN_PRICE = '990';
    const NEAREST_MAX_PRICE = '4990';

    const store = makeMockStore({
      CatalogFilter: {
        minPrice: MIN_PRICE,
        maxPrice: MAX_PRICE,
        minPriceLimit: InitialCatalogPriceLimit.Min,
        maxPriceLimit: InitialCatalogPriceLimit.Max,
        nearestMinPrice: NEAREST_MIN_PRICE,
        nearestMaxPrice: NEAREST_MAX_PRICE,
      },
    });

    render(
      <Provider store={store}>
        <PriceFilter />
      </Provider>
    );

    expect(screen.getByTestId('min-price-input')).toHaveValue(Number(NEAREST_MIN_PRICE));
    expect(screen.getByTestId('max-price-input')).toHaveValue(Number(NEAREST_MAX_PRICE));
  });

  it('should dispatch "catalogFilterMinPriceUpdate" and "catalogFilterMaxPriceUpdate" when user keydown enter', async () => {
    const store = makeMockStore({
      CatalogFilter: {
        minPrice: null,
        maxPrice: null,
        minPriceLimit: InitialCatalogPriceLimit.Min,
        maxPriceLimit: InitialCatalogPriceLimit.Max,
        nearestMinPrice: null,
        nearestMaxPrice: null,
      },
    });

    render(
      <Provider store={store}>
        <PriceFilter />
      </Provider>
    );

    const minPriceInput = screen.getByTestId('min-price-input');
    minPriceInput.focus();

    await userEvent.keyboard('{enter}');

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([
      catalogFilterMinPriceUpdate.type,
      catalogFilterMaxPriceUpdate.type
    ]);
  });
});
