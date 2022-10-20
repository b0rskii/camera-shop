import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { successPopupStatusUpdate } from '../../../store/app-slice/app-slice';
import { Action } from 'redux';
import SuccessPopup from './success-popup';

const makeMockStore = configureMockStore();

describe('Component: SuccessPopup', () => {
  it('should render correctly if popup opened status is true', () => {
    const SUCCESS_TITLE = 'Success';
    const store = makeMockStore({
      App: {
        isSuccessPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <SuccessPopup title={SUCCESS_TITLE} />
      </Provider>
    );

    expect(screen.getByText(SUCCESS_TITLE)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });

  it('should not render if popup opened status is false', () => {
    const SUCCESS_TITLE = 'Success';
    const store = makeMockStore({
      App: {
        isSuccessPopupOpened: false,
      }
    });

    render(
      <Provider store={store}>
        <SuccessPopup title={SUCCESS_TITLE} />
      </Provider>
    );

    expect(screen.queryByText(SUCCESS_TITLE)).not.toBeInTheDocument();
    expect(screen.queryByText(/Вернуться к покупкам/i)).not.toBeInTheDocument();
  });

  it('should dispatch "setIsSuccessPopupOpened" when user clicked on button', async () => {
    const SUCCESS_TITLE = 'Success';
    const store = makeMockStore({
      App: {
        isSuccessPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <SuccessPopup title={SUCCESS_TITLE} />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Вернуться к покупкам/i));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([
      successPopupStatusUpdate.type
    ]);
  });
});
