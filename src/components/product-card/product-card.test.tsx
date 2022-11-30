import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { addToBasketPopupStatusUpdate } from '../../store/app-slice/app-slice';
import { createMemoryHistory } from 'history';
import { makeMockCamera } from '../../utils/mocks';
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
          <ProductCard
            product={camera}
            isInBasket={false}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });

  it('should render correctly if product added to basket', () => {
    const camera = makeMockCamera();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard
            product={camera}
            isInBasket
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(/В корзине/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });

  it('should dispatch "setCurrentProduct" and "setIsAddToBasketPopupOpened" when user clicked on buy button', async () => {
    const camera = makeMockCamera();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard
            product={camera}
            isInBasket={false}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Купить/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([
      addToBasketPopupStatusUpdate.type
    ]);
  });

  it('should redirect when user clicked to link', async () => {
    const camera = makeMockCamera();
    const store = makeMockStore();

    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard
            product={camera}
            isInBasket={false}
          />
        </HistoryRouter>
      </Provider>
    );

    const prevPath = history.location.pathname;

    await userEvent.click(screen.getByText(/Подробнее/i));

    expect(history.location.pathname).not.toBe(prevPath);
  });
});
