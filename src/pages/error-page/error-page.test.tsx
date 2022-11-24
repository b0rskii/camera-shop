import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import ErrorPage from './error-page';

const history = createMemoryHistory();

describe('Component: ErrorPage', () => {
  it('should render correctly and redirect when user clicked on link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <ErrorPage />
      </HistoryRouter>
    );

    const goBackLink = screen.getByText(/Вернуться назад/i);

    expect(screen.getByText(/Произошла ошибка/i)).toBeInTheDocument();
    expect(goBackLink).toBeInTheDocument();

    const prevPath = history.location.pathname;

    await userEvent.click(goBackLink);

    expect(history.location.pathname).not.toBe(prevPath);
  });
});
