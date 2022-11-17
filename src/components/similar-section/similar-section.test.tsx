import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeMockCameras } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import SimilarSection from './similar-section';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const history = createMemoryHistory();

describe('Component: SimilarSection', () => {
  it('should render component correctly if loaded without error and there are similar cameras', () => {
    const ID = '1';
    const cameras = makeMockCameras();
    const store = makeMockStore({
      SimilarCameras: {
        similarCameras: cameras,
        isLoaded: true,
        loadingError: null,
      },
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });

  it('should not render component if loaded without error and there are no similar cameras', () => {
    const ID = '1';
    const store = makeMockStore({
      SimilarCameras: {
        similarCameras: [],
        isLoaded: true,
        loadingError: null,
      },
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Похожие товары/i)).not.toBeInTheDocument();
  });

  it('should render loader if similar cameras loading', () => {
    const ID = '1';
    const store = makeMockStore({
      SimilarCameras: {
        similarCameras: [],
        isLoaded: false,
        loadingError: null,
      },
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('slider')).not.toBeInTheDocument();
  });

  it('should render component correctly if loaded with error', () => {
    const ID = '1';
    const ERROR = 'error';
    const store = makeMockStore({
      SimilarCameras: {
        similarCameras: [],
        isLoaded: true,
        loadingError: ERROR,
      },
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(ERROR)).toBeInTheDocument();
    expect(screen.queryByTestId('slider')).not.toBeInTheDocument();
  });
});
