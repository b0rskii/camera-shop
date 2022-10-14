import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Error from './error';

const history = createMemoryHistory();

describe('Component: Error', () => {
  it('should render correctly', () => {
    const ERROR_MESSAGE = 'error';

    render(
      <HistoryRouter history={history}>
        <Error message={ERROR_MESSAGE} />
      </HistoryRouter>
    );

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(/Обновить/i)).toBeInTheDocument();
  });

  it('should refresh the page when user clicked to button', async () => {
    const ERROR_MESSAGE = 'error';

    history.push('/current-page');

    const prevLocation = history.location.pathname;

    render(
      <HistoryRouter history={history}>
        <Error message={ERROR_MESSAGE} />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Обновить'));
    expect(history.location.pathname).toBe(prevLocation);
  });
});
