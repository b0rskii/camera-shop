import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeMockCameras } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import SimilarProductsList from './similar-products-list';

const makeMockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SimilarProductsList', () => {
  it('should render correctly', () => {
    const START_DISPLAYED_INDEX = 0;
    const DISPLAYED_ITEMS_COUNT = 3;
    const cameras = makeMockCameras();
    const store = makeMockStore({
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarProductsList
            products={cameras}
            startDisplayedIndex={START_DISPLAYED_INDEX}
            displayedItemsCount={DISPLAYED_ITEMS_COUNT}
          />
        </HistoryRouter>
      </Provider>
    );

    const productCards = screen.getAllByTestId('product-card');
    const dispalyedCards: HTMLElement[] = [];

    productCards.forEach((product) => {
      if (product.classList.contains('is-active')) {
        dispalyedCards.push(product);
      }
    });

    expect(productCards).toHaveLength(cameras.length);
    expect(dispalyedCards).toHaveLength(DISPLAYED_ITEMS_COUNT);
  });
});
