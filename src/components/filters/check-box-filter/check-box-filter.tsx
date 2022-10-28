import { Filter } from '../../../types/types';
import CheckBox from '../../check-box/check-box';

type CheckBoxFilterProps = {
  title: string;
  filters: Filter[];
  filterData: string[];
  onFilterChange: (filter: string) => void;
  extraData?: string[];
};

function CheckBoxFilter(props: CheckBoxFilterProps): JSX.Element {
  const {title, filters, filterData, onFilterChange, extraData} = props;

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">{title}</legend>
      {filters.map((filter) => {
        const isChecked = filterData.some((item) => item === filter.Title);
        const isDisabled = extraData
          ? extraData.some((item) => item === filter.DisableFilter)
          : undefined;

        return (
          <CheckBox
            name={filter.Name}
            title={filter.Title}
            isChecked={isChecked}
            isDisabled={isDisabled}
            onFilterChange={() => onFilterChange(filter.Title)}
            key={filter.Name}
          />
        );
      })}
    </fieldset>
  );
}

export default CheckBoxFilter;
