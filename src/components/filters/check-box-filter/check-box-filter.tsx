import { memo, useCallback } from 'react';
import { FilterValue } from '../../../types/types';
import CheckBox from '../../check-box/check-box';

type CheckBoxFilterProps = {
  title: string;
  values: FilterValue[];
  filterData: string[];
  onFilterChange: (filter: string) => void;
  extraData?: string[];
};

function CheckBoxFilter(props: CheckBoxFilterProps): JSX.Element {
  const {title, values, filterData, onFilterChange, extraData} = props;

  const changeCheckBoxValue = useCallback(
    (value: string) => onFilterChange(value),
    [onFilterChange]
  );

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">{title}</legend>
      {values.map((filter) => {
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
            onCheckBoxChange={changeCheckBoxValue}
            key={filter.Name}
          />
        );
      })}
    </fieldset>
  );
}

export default memo(CheckBoxFilter);
