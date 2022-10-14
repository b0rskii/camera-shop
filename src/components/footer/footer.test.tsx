import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should redirect to target page when user clicked to link', async () => {
    history.push('/current-page');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/current-page"
            element={<Footer />}
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
