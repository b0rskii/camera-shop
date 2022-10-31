import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
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
  const store = makeMockStore({
    CatalogSort: {
      sort: null,
      order: null,
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSort />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
