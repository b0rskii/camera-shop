import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { makeMockPromo } from '../../utils/mocks';
import { DEFAULT_ERROR_MESSAGE } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Banner from './banner';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: Banner', () => {
  it('should render component correctly if loaded without error', () => {
    const promo = makeMockPromo();
    const store = makeMockStore({
      Promo: {
        promo: promo,
        isLoaded: true,
        loadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect(screen.getByText(promo.name)).toBeInTheDocument();
  });

  it('should render loader component if data loading', () => {
    const store = makeMockStore({
      Promo: {
        promo: null,
        isLoaded: false,
        loadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render error component if data loaded with error', () => {
    const store = makeMockStore({
      Promo: {
        promo: null,
        isLoaded: true,
        loadingError: DEFAULT_ERROR_MESSAGE,
        defaultError: DEFAULT_ERROR_MESSAGE,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it('should redirect when user clicked to link', async () => {
    const promo = makeMockPromo();
    const store = makeMockStore({
      Promo: {
        promo: promo,
        isLoaded: true,
        loadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    const prevPath = history.location.pathname;

    await userEvent.click(screen.getByText(/Подробнее/i));

    expect(history.location.pathname).not.toBe(prevPath);
  });
});
