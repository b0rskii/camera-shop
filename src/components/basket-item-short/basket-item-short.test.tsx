import { render, screen } from '@testing-library/react';
import { makeMockCamera } from '../../utils/mocks';
import BasketItemShort from './basket-item-short';

const camera = makeMockCamera();

describe('Component: BasketItemShort', () => {
  it('should render correctly without price', () => {
    render(
      <BasketItemShort
        item={camera}
      />
    );

    expect(screen.getByAltText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${camera.type} ${camera.category.toLowerCase()}`)).toBeInTheDocument();
    expect(screen.getByText(`${camera.level} уровень`)).toBeInTheDocument();
    expect(screen.queryByTestId('basket-item-price')).not.toBeInTheDocument();
  });

  it('should render correctly with price', () => {
    render(
      <BasketItemShort
        item={camera}
        isWithPrice
      />
    );

    expect(screen.getByTestId('basket-item-price')).toBeInTheDocument();
  });
});
