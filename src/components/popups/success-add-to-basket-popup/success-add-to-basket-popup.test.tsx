import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { successAddToBasketPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import HistoryRouter from '../../history-router/history-router';
import SuccessAddToBasketPopup from './success-add-to-basket-popup';

const makeMockStore = configureMockStore();
const history = createMemoryHistory();

document.body.scrollIntoView = jest.fn();

describe('Component: SuccessAddToBasketPopup', () => {
  it('should render correctly if popup opened status is true', () => {
    const store = makeMockStore({
      App: {
        isSuccessAddToBasketPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessAddToBasketPopup />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('should not render if popup opened status is false', () => {
    const store = makeMockStore({
      App: {
        isSuccessAddToBasketPopupOpened: false,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessAddToBasketPopup />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Товар успешно добавлен в корзину/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Продолжить покупки/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Перейти в корзину/i)).not.toBeInTheDocument();
  });

  it('should dispatch "successAddToBasketPopupStatusUpdate" action when user click to continue shopping button', async () => {
    const store = makeMockStore({
      App: {
        isSuccessAddToBasketPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessAddToBasketPopup />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Продолжить покупки/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);
    expect(actionsTypes).toEqual([
      successAddToBasketPopupStatusUpdate.type
    ]);
  });

  it('should dispatch "successAddToBasketPopupStatusUpdate" action when user click to go to basket button', async () => {
    const store = makeMockStore({
      App: {
        isSuccessAddToBasketPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessAddToBasketPopup />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Перейти в корзину/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);
    expect(actionsTypes).toEqual([
      successAddToBasketPopupStatusUpdate.type
    ]);
  });
});
