import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should redirect to main page when user clicked on link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/fake"
            element={<NotFoundPage />}
          />
          <Route
            path={AppRoute.Main}
            element={<h1>MainPage</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    const linkToMain = screen.getByText(/На главную/i);

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(linkToMain).toBeInTheDocument();
    expect(screen.queryByText('MainPage')).not.toBeInTheDocument();

    await userEvent.click(linkToMain);

    expect(screen.queryByText(/Страница не найдена/i)).not.toBeInTheDocument();
    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });
});
