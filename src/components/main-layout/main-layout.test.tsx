import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import MainLayout from './main-layout';

const history = createMemoryHistory();

describe('Component: MainLayout', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <MainLayout />
      </HistoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
