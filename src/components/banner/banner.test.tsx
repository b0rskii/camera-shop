import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { makeMockPromo } from '../../utils/mocks';
import { DEFAULT_ERROR_MESSAGE, AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Banner from './banner';

const makeMockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Banner', () => {
  it('should render component correctly if loaded without error', () => {
    const promo = makeMockPromo();
    const store = makeMockStore({
      Data: {
        promo: promo,
        isPromoLoaded: true,
        promoLoadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect(screen.getByText(promo.name)).toBeInTheDocument();
  });

  it('should render loader component if data loading', () => {
    const store = makeMockStore({
      Data: {
        promo: null,
        isPromoLoaded: false,
        promoLoadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render error component if data loaded with error', () => {
    const store = makeMockStore({
      Data: {
        promo: null,
        isPromoLoaded: true,
        promoLoadingError: DEFAULT_ERROR_MESSAGE,
        defaultError: DEFAULT_ERROR_MESSAGE,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it('should redirect to product page when user clicked to link', async () => {
    const ID = 1;
    const promo = makeMockPromo();
    const store = makeMockStore({
      Data: {
        promo: promo,
        isPromoLoaded: true,
        promoLoadingError: null,
      }
    });

    history.push(AppRoute.Catalog);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Catalog}
              element={<Banner />}
            />
            <Route
              path={`${AppRoute.Product}${ID}`}
              element={<h1>ProductPage</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/ProductPage/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Подробнее'));

    expect(screen.getByText(/ProductPage/i)).toBeInTheDocument();
  });
});
