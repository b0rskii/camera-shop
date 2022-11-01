import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { catalogSortUpdate } from '../../store/catalog-sort-slice/catalog-sort-slice';
import HistoryRouter from '../history-router/history-router';
import CatalogSort from './catalog-sort';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const store = makeMockStore({
      CatalogSort: {
        sort: null,
        order: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSort />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });

  it('should dispatch "catalogSortUpdate" when user clicked to sort button', async () => {
    const store = makeMockStore({
      CatalogSort: {
        sort: null,
        order: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSort />
        </HistoryRouter>
      </Provider>
    );

    const sortButton = screen.getByTestId('по цене');

    await userEvent.click(sortButton);

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([catalogSortUpdate.type]);
  });
});
