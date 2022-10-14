import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { makeMockCamera } from '../../utils/mocks';
import { ProductTab } from '../../const';
import HistoryRouter from '../history-router/history-router';
import ProductTabs from './product-tabs';

const history = createMemoryHistory();

describe('Component: ProductTabs', () => {
  it('should render correctly', async () => {
    const product = makeMockCamera();

    render(
      <HistoryRouter history={history}>
        <ProductTabs product={product} />
      </HistoryRouter>
    );

    expect(screen.getByText(ProductTab.Description.Name)).toHaveClass('tabs__control is-active');
    expect(screen.queryByText(ProductTab.Characteristics.Name)).not.toHaveClass('tabs__control is-active');
    expect(screen.getByText(product.description)).toBeInTheDocument();

    await userEvent.click(screen.getByText(ProductTab.Characteristics.Name));

    expect(screen.getByText(ProductTab.Characteristics.Name)).toHaveClass('tabs__control is-active');
    expect(screen.queryByText(ProductTab.Description.Name)).not.toHaveClass('tabs__control is-active');
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
  });
});
