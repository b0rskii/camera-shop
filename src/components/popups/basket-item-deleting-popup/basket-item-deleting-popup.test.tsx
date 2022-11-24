import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeMockCamera } from '../../../utils/mocks';
import { Action } from '@reduxjs/toolkit';
import { basketItemRemoving } from '../../../store/basket-slice/basket-slice';
import { basketItemDeletingPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import BasketItemDeletingPopup from './basket-item-deleting-popup';

const makeMockStore = configureMockStore();

describe('Component: BasketItemDeletingPopup', () => {
  it('should render correctly if popup opened status is true', () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      App: {
        currentProduct: camera,
        isBasketItemDeletingPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <BasketItemDeletingPopup />
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар\?/i)).toBeInTheDocument();
    expect(screen.getByText('Удалить')).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });

  it('should not render if popup opened status is false', () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      App: {
        currentProduct: camera,
        isBasketItemDeletingPopupOpened: false,
      }
    });

    render(
      <Provider store={store}>
        <BasketItemDeletingPopup />
      </Provider>
    );

    expect(screen.queryByText(/Удалить этот товар\?/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Удалить')).not.toBeInTheDocument();
    expect(screen.queryByText(/Продолжить покупки/i)).not.toBeInTheDocument();
  });

  it('should dispatch "basketItemRemoving" and "basketItemDeletingPopupStatusUpdate" actions when user click to remove button', async () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      App: {
        currentProduct: camera,
        isBasketItemDeletingPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <BasketItemDeletingPopup />
      </Provider>
    );

    await userEvent.click(screen.getByText('Удалить'));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);
    expect(actionsTypes).toEqual([
      basketItemRemoving.type,
      basketItemDeletingPopupStatusUpdate.type
    ]);
  });

  it('"basketItemDeletingPopupStatusUpdate" actions when user click to continue shopping button', async () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      App: {
        currentProduct: camera,
        isBasketItemDeletingPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <BasketItemDeletingPopup />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Продолжить покупки/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);
    expect(actionsTypes).toEqual([
      basketItemDeletingPopupStatusUpdate.type
    ]);
  });
});
