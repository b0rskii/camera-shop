import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeMockCamera } from '../../../utils/mocks';
import { Action } from '@reduxjs/toolkit';
import { basketItemAdding } from '../../../store/basket-slice/basket-slice';
import { addToBasketPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import HistoryRouter from '../../history-router/history-router';
import AddToBasketPopup from './add-to-basket-popup';

const makeMockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: AddToBasketPopup', () => {
  it('should render correctly if popup opened status is true', () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      App: {
        currentProduct: camera,
        isAddToBasketPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddToBasketPopup />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByAltText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('should not render if popup opened status is false', () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      App: {
        currentProduct: camera,
        isAddToBasketPopupOpened: false,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddToBasketPopup />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Добавить товар в корзину/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(camera.name)).not.toBeInTheDocument();
    expect(screen.queryByText(camera.name)).not.toBeInTheDocument();
    expect(screen.queryByText(/Добавить в корзину/i)).not.toBeInTheDocument();
  });

  it('should dispatch "basketItemAdding" and "addToBasketPopupStatusUpdate" actions when user click to "add to basket" button', async () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      App: {
        currentProduct: camera,
        isAddToBasketPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddToBasketPopup />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Добавить в корзину/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);
    expect(actionsTypes).toEqual([
      basketItemAdding.type,
      addToBasketPopupStatusUpdate.type
    ]);
  });
});
