import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {

  it('should render correctly', () => {
    render(
      <CatalogFilter />
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
  });
});
