import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import ErrorMessage from './error-message';

const makeMockStore = configureMockStore();

describe('Component: ErrorMessage', () => {
  it('should render correctly if error', () => {
    const ERROR_MESSAGE = 'error';
    const store = makeMockStore({
      Data: {
        error: ERROR_MESSAGE,
      }
    });

    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });

  it('should not render if error null', () => {
    const store = makeMockStore({
      Data: {
        error: null,
      }
    });

    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
