import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { setIsPostReviewPopupOpened } from '../../store/app-process/app-process';
import { Action } from '@reduxjs/toolkit';
import { api } from '../../store/store';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeMockReviews } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ReviewSection from './review-section';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const history = createMemoryHistory();

describe('Component: ReviewSection', () => {
  it('should render component correctly if loaded without error and there are reviews', () => {
    const ID = '1';
    const reviews = makeMockReviews();
    const store = makeMockStore({
      Data: {
        reviews: reviews,
        isReviewsLoaded: true,
        reviewsLoadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.queryByText(/Пока нет ни одного отзыва/i)).not.toBeInTheDocument();
  });

  it('should render component correctly if loaded without error and there are no reviews', () => {
    const ID = '1';
    const store = makeMockStore({
      Data: {
        reviews: [],
        isReviewsLoaded: true,
        reviewsLoadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument();
    expect(screen.getByText(/Пока нет ни одного отзыва/i)).toBeInTheDocument();
  });

  it('should render loader if reviews loading', () => {
    const ID = '1';
    const store = makeMockStore({
      Data: {
        reviews: [],
        isReviewsLoaded: false,
        reviewsLoadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.queryByText(/Оставить свой отзыв/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument();
  });

  it('should render component correctly if loaded with error', () => {
    const ID = '1';
    const DEFAULT_ERROR = 'error';
    const store = makeMockStore({
      Data: {
        reviews: [],
        isReviewsLoaded: true,
        reviewsLoadingError: DEFAULT_ERROR,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_ERROR)).toBeInTheDocument();
    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument();
  });

  it('should dispatch "setIsPostReviewPopupOpened" when user clicked on post review button', async () => {
    const ID = '1';
    const reviews = makeMockReviews();
    const store = makeMockStore({
      Data: {
        reviews: reviews,
        isReviewsLoaded: true,
        reviewsLoadingError: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSection id={ID} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Оставить свой отзыв/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toContainEqual(setIsPostReviewPopupOpened.type);
  });
});
