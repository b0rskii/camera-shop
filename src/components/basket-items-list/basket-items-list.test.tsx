import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeMockBasketItems } from '../../utils/mocks';
import BasketItemsList from './basket-items-list';

const makeMockStore = configureMockStore();

describe('Component: BasketItemsList', () => {
  it('should render correctly', () => {
    const basketItems = makeMockBasketItems();

    const store = makeMockStore({
      Basket: {
        basketItems,
      }
    });

    render(
      <Provider store={store}>
        <BasketItemsList />
      </Provider>
    );

    expect(screen.getAllByTestId('basket-item')).toHaveLength(basketItems.length);
  });
});
