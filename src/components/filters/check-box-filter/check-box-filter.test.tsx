import { render, screen } from '@testing-library/react';
import { makeMockFilters } from '../../../utils/mocks';
import CheckBoxFilter from './check-box-filter';

const TITLE = 'title';
const filters = makeMockFilters();
const filterData: string[] = [];
const onFilterChange = jest.fn();

describe('Component: CheckBoxFilter', () => {
  it('should render correctly', () => {
    render(
      <CheckBoxFilter
        title={TITLE}
        filters={filters}
        filterData={filterData}
        onFilterChange={onFilterChange}
      />
    );

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(filters.length);
  });
});
