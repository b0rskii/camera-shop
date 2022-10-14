import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { setCurrentProduct, setIsAddToBasketPopupOpened } from '../../store/app-process/app-process';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { makeMockCamera } from '../../utils/mocks';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import ProductCard from './product-card';

const makeMockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const camera = makeMockCamera();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard product={camera}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });

  it('should dispatch "setCurrentProduct" and "setIsAddToBasketPopupOpened" when user clicked on buy button', async () => {
    const camera = makeMockCamera();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard product={camera}/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Купить/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([
      setCurrentProduct.type,
      setIsAddToBasketPopupOpened.type
    ]);
  });

  it('should redirect to target page when user clicked to link', async () => {
    const ID = 1;
    const camera = makeMockCamera();
    const store = makeMockStore();

    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="/fake"
              element={<ProductCard product={camera} />}
            />
            <Route
              path={`${AppRoute.Product}${ID}`}
              element={<h1>ProductPage</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('ProductPage')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(/Подробнее/i));

    expect(screen.getByText('ProductPage')).toBeInTheDocument();
  });
});
