import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeMockCamera } from '../../../utils/mocks';
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
});
