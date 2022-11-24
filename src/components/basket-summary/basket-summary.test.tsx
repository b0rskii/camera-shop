import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeMockBasketItems } from '../../utils/mocks';
import BasketSummary from './basket-summary';

const makeMockStore = configureMockStore();

describe('Component: BasketSummary', () => {
  it('should render correctly', () => {
    const basketItems = makeMockBasketItems();

    const store = makeMockStore({
      Basket: {
        basketItems,
        discount: 0,
        promoCode: '',
        isOrderPosting: false,
      },
    });

    render(
      <Provider store={store}>
        <BasketSummary />
      </Provider>
    );

    expect(screen.getByTestId('basket-summary')).toBeInTheDocument();
  });

  it('should render correctly if basket is empty', () => {
    const store = makeMockStore({
      Basket: {
        basketItems: [],
        discount: 0,
        promoCode: '',
        isOrderPosting: false,
      },
    });

    render(
      <Provider store={store}>
        <BasketSummary />
      </Provider>
    );

    expect(screen.getByText(/Здесь пока ничего нет/i)).toBeInTheDocument();
  });
});
