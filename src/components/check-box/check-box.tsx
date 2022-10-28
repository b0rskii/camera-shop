type CheckBoxProps = {
  name: string;
  title: string;
  isChecked: boolean | undefined;
  isDisabled?: boolean;
  onFilterChange: () => void;
};

function CheckBox({name, title, isChecked, isDisabled, onFilterChange }: CheckBoxProps): JSX.Element {
  return (
    <div className="custom-checkbox catalog-filter__item" key={name}>
      <label>
        <input
          id={name}
          onChange={onFilterChange}
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={isDisabled}
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{title}</span>
      </label>
    </div>
  );
}

export default CheckBox;
