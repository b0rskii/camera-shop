import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeMockBasketItems, makeMockCameras } from '../../utils/mocks';
import BasketSummary from './basket-summary';

const makeMockStore = configureMockStore();

describe('Component: BasketSummary', () => {
  it('should render correctly', () => {
    const basketItems = makeMockBasketItems(2);
    const cameras = makeMockCameras(2);

    const store = makeMockStore({
      Basket: {
        basketItems,
        cameras,
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
});
