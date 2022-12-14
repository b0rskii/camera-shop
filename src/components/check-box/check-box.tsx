import { memo } from 'react';

type CheckBoxProps = {
  name: string;
  title: string;
  isChecked: boolean | undefined;
  isDisabled?: boolean;
  onCheckBoxChange: (value: string) => void;
};

function CheckBox({name, title, isChecked, isDisabled, onCheckBoxChange }: CheckBoxProps): JSX.Element {
  return (
    <div className="custom-checkbox catalog-filter__item" key={name}>
      <label>
        <input
          id={name}
          onChange={() => onCheckBoxChange(title)}
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={isDisabled}
          data-testid={name}
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{title}</span>
      </label>
    </div>
  );
}

export default memo(CheckBox);
