import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeMockCamera } from '../../../utils/mocks';
import PostReviewPopup from './post-review-popup';

const makeMockStore = configureMockStore();

describe('Component: PostReviewPopup', () => {
  it('should render correctly if popup opened status is true', () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      Data: {
        currentCamera: camera,
      },
      App: {
        isPostReviewPopupOpened: true,
      }
    });

    render(
      <Provider store={store}>
        <PostReviewPopup />
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should not render if popup opened status is false', () => {
    const camera = makeMockCamera();
    const store = makeMockStore({
      Data: {
        currentCamera: camera
      },
      App: {
        isPostReviewPopupOpened: false,
      }
    });

    render(
      <Provider store={store}>
        <PostReviewPopup />
      </Provider>
    );

    expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();
  });
});
