import { render, screen } from '@testing-library/react';
import { makeMockFilterValues } from '../../../utils/mocks';
import CheckBoxFilter from './check-box-filter';

const TITLE = 'title';
const filterValues = makeMockFilterValues();
const filterData: string[] = [];
const onFilterChange = jest.fn();

describe('Component: CheckBoxFilter', () => {
  it('should render correctly', () => {
    render(
      <CheckBoxFilter
        title={TITLE}
        values={filterValues}
        filterData={filterData}
        onFilterChange={onFilterChange}
      />
    );

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(filterValues.length);
  });
});
