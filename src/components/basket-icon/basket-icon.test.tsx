import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import BasketIcon from './basket-icon';

const history = createMemoryHistory();

describe('Component: BasketIcon', () => {
  it('should render correctly', () => {
    const BASKET_ITEMS_COUNT = 5;

    render(
      <HistoryRouter history={history}>
        <BasketIcon basketItemsCount={BASKET_ITEMS_COUNT} />
      </HistoryRouter>
    );

    expect(screen.getByText(BASKET_ITEMS_COUNT)).toBeInTheDocument();
  });

  it('should render correctly if basket is empty', () => {
    const BASKET_ITEMS_COUNT = 0;

    render(
      <HistoryRouter history={history}>
        <BasketIcon basketItemsCount={BASKET_ITEMS_COUNT} />
      </HistoryRouter>
    );

    expect(screen.queryByText(BASKET_ITEMS_COUNT)).not.toBeInTheDocument();
  });
});
