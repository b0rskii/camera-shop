import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { makeMockCamera } from '../../utils/mocks';
import { AppRoute } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import ProductPage from './product-page';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const ID = 1;
    const camera = makeMockCamera();
    const store = makeMockStore({
      Cameras: {
        searchingCameras: [],
      },
      CurrentCamera: {
        currentCamera: camera,
        isLoaded: true,
        loadingError: null,
      },
      SimilarCameras: {
        similarCameras: [],
        isLoaded: false,
        loadingError: null,
      },
      Reviews: {
        reviews: [],
        isLoaded: false,
        loadingError: null,
      },
      App: {
        currentProduct: null,
        isAddToBasketPopupOpened: false,
        isPostReviewPopupOpened: false,
        isSuccessPopupOpened: false,
        isSuccessAddToBasketPopupOpened: false,
      },
      Basket: {
        basketItems: [],
      },
    });

    history.push(`${AppRoute.Product}${ID}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.ProductId}
              element={<ProductPage />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
