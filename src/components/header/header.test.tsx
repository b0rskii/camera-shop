import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
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

  it('should redirect when user clicked to link', async () => {
    history.push('/current-page');

    render(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
    );

    const prevPath = history.location.pathname;

    await userEvent.click(screen.getByText('Каталог'));

    expect(history.location.pathname).not.toBe(prevPath);
  });
});
