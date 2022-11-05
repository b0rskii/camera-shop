import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagination';

const history = createMemoryHistory();

const PRODUCTS_TOTAL_COUNT = 50;
const PRODUCTS_PER_PAGE_COUNT = 6;
const pagesCount = Math.ceil(PRODUCTS_TOTAL_COUNT / PRODUCTS_PER_PAGE_COUNT);

const setCurrentPage = jest.fn();

const getFakePagination = (currentPage: number) => (
  <HistoryRouter history={history}>
    <Pagination
      productsTotalCount={PRODUCTS_TOTAL_COUNT}
      productsPerPageCount={PRODUCTS_PER_PAGE_COUNT}
      currentPage={currentPage}
      onSetCurrentPage={setCurrentPage}
    />
  </HistoryRouter>
);

describe('Component: Pagination', () => {
  it('should render correctly if current page is first', () => {
    const CURRENT_PAGE = 1;
    const fakePagination = getFakePagination(CURRENT_PAGE);

    render(fakePagination);

    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getByText(CURRENT_PAGE)).toHaveClass('pagination__link--active');
    expect(screen.getAllByTestId('pagination-item')).toHaveLength(pagesCount);
  });

  it('should render correctly if current page is last', () => {
    const fakePagination = getFakePagination(pagesCount);

    render(fakePagination);

    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(pagesCount)).toHaveClass('pagination__link--active');
    expect(screen.getAllByTestId('pagination-item')).toHaveLength(pagesCount);
  });

  it('should render correctly if current page is not first and not last', () => {
    const CURRENT_PAGE = 3;
    const fakePagination = getFakePagination(CURRENT_PAGE);

    render(fakePagination);

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(CURRENT_PAGE)).toHaveClass('pagination__link--active');
    expect(screen.getAllByTestId('pagination-item')).toHaveLength(pagesCount);
  });

  it('should called callback when user clicked on prev button', async () => {
    const CURRENT_PAGE = 3;
    const fakePagination = getFakePagination(CURRENT_PAGE);

    render(fakePagination);

    await userEvent.click(screen.getByText('Назад'));
    expect(setCurrentPage).toBeCalled();
  });

  it('should called callback when user clicked on next button', async () => {
    const CURRENT_PAGE = 3;
    const fakePagination = getFakePagination(CURRENT_PAGE);

    render(fakePagination);

    await userEvent.click(screen.getByText('Далее'));
    expect(setCurrentPage).toBeCalled();
  });

  it('should called callback when user clicked on page button', async () => {
    const CURRENT_PAGE = 3;
    const TARGET_PAGE = 5;
    const fakePagination = getFakePagination(CURRENT_PAGE);

    render(fakePagination);

    await userEvent.click(screen.getByText(TARGET_PAGE));
    expect(setCurrentPage).toBeCalled();
  });
});
