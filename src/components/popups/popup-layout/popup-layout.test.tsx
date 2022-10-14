import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PopupLayout from './popup-layout';

describe('Component: PopupLayout', () => {
  it('should render correctly if popup opened status is true', () => {
    const setIsPopupOpened = jest.fn();

    render(
      <PopupLayout
        isPopupOpened
        onSetIsPopupOpened={setIsPopupOpened}
      />
    );

    expect(screen.getByTestId('popup-layout')).toBeInTheDocument();
  });

  it('should not render if popup opened status is false', () => {
    const setIsPopupOpened = jest.fn();

    render(
      <PopupLayout
        isPopupOpened={false}
        onSetIsPopupOpened={setIsPopupOpened}
      />
    );

    expect(screen.queryByTestId('popup-layout')).not.toBeInTheDocument();
  });

  it('should called "onSetIsPopupOpened" when user clicked button', async () => {
    const setIsPopupOpened = jest.fn();

    render(
      <PopupLayout
        isPopupOpened
        onSetIsPopupOpened={setIsPopupOpened}
      />
    );

    await userEvent.click(screen.getByTestId('close-button'));
    expect(setIsPopupOpened).toBeCalled();
  });

  it('should called "onSetIsPopupOpened" when user clicked popup overlay', async () => {
    const setIsPopupOpened = jest.fn();

    render(
      <PopupLayout
        isPopupOpened
        onSetIsPopupOpened={setIsPopupOpened}
      />
    );

    await userEvent.click(screen.getByTestId('popup-overlay'));
    expect(setIsPopupOpened).toBeCalled();
  });

  it('should called "onSetIsPopupOpened" when user escape keydown', async () => {
    const setIsPopupOpened = jest.fn();

    render(
      <PopupLayout
        isPopupOpened
        onSetIsPopupOpened={setIsPopupOpened}
      />
    );

    await userEvent.keyboard('{Escape}');
    expect(setIsPopupOpened).toBeCalled();
  });
});
