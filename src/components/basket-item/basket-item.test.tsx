import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeMockCamera } from '../../utils/mocks';
import BasketItem from './basket-item';

const ITEMS_COUNT = 2;
const MIN_ITEMS_COUNT = 1;
const MAX_ITEMS_COUNT = 10;
const CAMERA_PRICE = 70000;

const camera = makeMockCamera();
camera.price = CAMERA_PRICE;

const onRemoveButtonClick = jest.fn();
const onCounterChange = jest.fn();

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    render(
      <BasketItem
        item={camera}
        itemsCount={ITEMS_COUNT}
        minItemsCount={MIN_ITEMS_COUNT}
        maxItemsCount={MAX_ITEMS_COUNT}
        onRemoveButtonClick={onRemoveButtonClick}
        onCounterChange={onCounterChange}
      />
    );

    expect(screen.getByText(/70 000/i)).toBeInTheDocument();
    expect(screen.getByText(/140 000/i)).toBeInTheDocument();
    expect(screen.getByTestId('delete-basket-item-button')).toBeInTheDocument();
  });

  it('when user clicked to remove button should called callback', async () => {
    render(
      <BasketItem
        item={camera}
        itemsCount={ITEMS_COUNT}
        minItemsCount={MIN_ITEMS_COUNT}
        maxItemsCount={MAX_ITEMS_COUNT}
        onRemoveButtonClick={onRemoveButtonClick}
        onCounterChange={onCounterChange}
      />
    );

    await userEvent.click(screen.getByTestId('delete-basket-item-button'));

    expect(onRemoveButtonClick).toBeCalledWith(camera);
  });
});
