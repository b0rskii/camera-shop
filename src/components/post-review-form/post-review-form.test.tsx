import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { postReviewAction } from '../../store/api-actions';
import { api } from '../../store/store';
import { Action } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { makeMockCamera } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import PostReviewForm from './post-review-form';

const middlewares = [thunk.withExtraArgument(api)];
const makeMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

const Valid = {
  Name: 'Name',
  Advantage: 'Advantage',
  Disadvantage: 'Disadvantage',
  Comment: 'Comment',
};

const camera = makeMockCamera();
const store = makeMockStore({
  Data: {
    currentCamera: camera,
  }
});

const fakePostReviewForm = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <PostReviewForm />
    </HistoryRouter>
  </Provider>
);

describe('Component: PostReviewForm', () => {
  it('should render correctly', () => {
    render(fakePostReviewForm);

    expect(screen.getByPlaceholderText(/Введите ваше имя/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Основные преимущества товара/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Главные недостатки товара/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Главные недостатки товара/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('should render correctly if user change inputs', async () => {
    render(fakePostReviewForm);

    const targetRatingInput = screen.getAllByTestId('rating-input')[3];
    const nameInput = screen.getByPlaceholderText(/Введите ваше имя/i);
    const advantageInput = screen.getByPlaceholderText(/Основные преимущества товара/i);
    const disadvantageInput = screen.getByPlaceholderText(/Главные недостатки товара/i);
    const commentInput = screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i);

    await userEvent.click(targetRatingInput);
    await userEvent.type(nameInput, Valid.Name);
    await userEvent.type(advantageInput, Valid.Advantage);
    await userEvent.type(disadvantageInput, Valid.Disadvantage);
    await userEvent.type(commentInput, Valid.Comment);

    expect(targetRatingInput).toBeChecked();
    expect(screen.getByDisplayValue(Valid.Name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(Valid.Advantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(Valid.Disadvantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(Valid.Comment)).toBeInTheDocument();
  });

  it('should dispatch "postReviewAction" when user submit and data is valid', async () => {
    render(fakePostReviewForm);

    const targetRatingInput = screen.getAllByTestId('rating-input')[3];
    const nameInput = screen.getByPlaceholderText(/Введите ваше имя/i);
    const advantageInput = screen.getByPlaceholderText(/Основные преимущества товара/i);
    const disadvantageInput = screen.getByPlaceholderText(/Главные недостатки товара/i);
    const commentInput = screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i);
    const submitButton = screen.getByText(/Отправить отзыв/i);

    await userEvent.click(targetRatingInput);
    await userEvent.type(nameInput, Valid.Name);
    await userEvent.type(advantageInput, Valid.Advantage);
    await userEvent.type(disadvantageInput, Valid.Disadvantage);
    await userEvent.type(commentInput, Valid.Comment);
    await userEvent.click(submitButton);

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toContainEqual(postReviewAction.pending.type);
  });

  it('should not dispatch "postReviewAction" when user submit and some data is unvalid', async () => {
    render(fakePostReviewForm);

    const targetRatingInput = screen.getAllByTestId('rating-input')[3];
    const advantageInput = screen.getByPlaceholderText(/Основные преимущества товара/i);
    const disadvantageInput = screen.getByPlaceholderText(/Главные недостатки товара/i);
    const commentInput = screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i);
    const submitButton = screen.getByText(/Отправить отзыв/i);

    await userEvent.click(targetRatingInput);
    await userEvent.type(advantageInput, Valid.Advantage);
    await userEvent.type(disadvantageInput, Valid.Disadvantage);
    await userEvent.type(commentInput, Valid.Comment);
    await userEvent.click(submitButton);

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toContainEqual(postReviewAction.pending.type);
  });
});
