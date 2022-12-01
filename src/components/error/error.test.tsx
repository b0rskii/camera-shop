import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { DEFAULT_ERROR_MESSAGE } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Error from './error';

const history = createMemoryHistory();

describe('Component: Error', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Error />
      </HistoryRouter>
    );

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(/Обновить/i)).toBeInTheDocument();
  });

  it('should refresh the page when user clicked to button', async () => {
    history.push('/current-page');

    const prevLocation = history.location.pathname;

    render(
      <HistoryRouter history={history}>
        <Error />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Обновить'));
    expect(history.location.pathname).toBe(prevLocation);
  });
});
