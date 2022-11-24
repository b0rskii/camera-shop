import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import BasketSection from './basket-section';

const makeMockStore = configureMockStore();

describe('Component: BasketSection', () => {
  it('should render correctly', () => {
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
        <BasketSection />
      </Provider>
    );

    expect(screen.getByTestId('basket-section')).toBeInTheDocument();
  });
});
