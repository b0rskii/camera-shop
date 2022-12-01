import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import BasketPage from './basket-page';

const DEFAULT_DISCOUNT = 0;

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: BasketPage', () => {
  const store = makeMockStore({
    Cameras: {
      searchingCameras: [],
    },
    App: {
      isBasketItemDeletingPopupOpened: false,
    },
    Basket: {
      basketItems: [],
      discount: DEFAULT_DISCOUNT,
      promoCode: '',
      isOrderPosting: false,
      postingError: null,
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
