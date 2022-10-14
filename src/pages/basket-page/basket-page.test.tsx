import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import BasketPage from './basket-page';

const history = createMemoryHistory();

describe('Component: BasketPage', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <BasketPage />
      </HistoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
