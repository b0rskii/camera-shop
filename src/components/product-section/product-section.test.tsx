import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { addToBasketPopupStatusUpdate } from '../../store/app-slice/app-slice';
import { makeMockCamera } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ProductSection from './product-section';

const makeMockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ProductSection', () => {
  it('should render correctly', () => {
    const camera = makeMockCamera();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductSection camera={camera} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('should dispatch "setCurrentProduct" and "setIsAddToBasketPopupOpened" when user clicked on add to basket button', async () => {
    const camera = makeMockCamera();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductSection camera={camera} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Добавить в корзину/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([
      addToBasketPopupStatusUpdate.type
    ]);
  });
});
