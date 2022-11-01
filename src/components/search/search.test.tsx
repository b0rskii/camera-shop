import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { searchingCamerasReset } from '../../store/cameras-slice/cameras-slice';
import { makeMockCameras } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Search from './search';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: Search', () => {
  it('should render without select list if searching cameras is empty', () => {
    const store = makeMockStore({
      Cameras: {
        searchingCameras: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render with select list if searching cameras is no empty', () => {
    const cameras = makeMockCameras();

    const store = makeMockStore({
      Cameras: {
        searchingCameras: cameras,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(cameras.length);
  });

  it('should dispatch "searchingCamerasReset" when user clicked to reset button', async () => {
    const store = makeMockStore({
      Cameras: {
        searchingCameras: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);
    expect(actionsTypes).toEqual([searchingCamerasReset.type]);
  });

  it('should navigate when user clicked to search list item', async () => {
    const cameras = makeMockCameras();

    const store = makeMockStore({
      Cameras: {
        searchingCameras: cameras,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>
    );

    const prevPath = history.location.pathname;

    await userEvent.click(screen.getAllByRole('listitem')[0]);

    expect(history.location.pathname).not.toBe(prevPath);
  });

  it('should navigate when user keydown enter to search list item', async () => {
    const cameras = makeMockCameras();

    const store = makeMockStore({
      Cameras: {
        searchingCameras: cameras,
      },
    });

    const newHistory = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={newHistory}>
          <Search />
        </HistoryRouter>
      </Provider>
    );

    const prevPath = newHistory.location.pathname;

    screen.getAllByRole('listitem')[0].focus();

    await userEvent.keyboard('{enter}');

    expect(newHistory.location.pathname).not.toBe(prevPath);
  });
});
