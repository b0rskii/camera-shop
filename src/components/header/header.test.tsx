import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should redirect to target page when user clicked to link', async () => {
    history.push('/current-page');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/current-page"
            element={<Header />}
          />
          <Route
            path={AppRoute.Catalog}
            element={<h1>CatalogPage</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText('CatalogPage')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Каталог'));

    expect(screen.getByText('CatalogPage')).toBeInTheDocument();
  });
});
