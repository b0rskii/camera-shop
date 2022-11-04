import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckBox from './check-box';

const NAME = 'name';
const TITLE = 'checkbox';
const onFilterChange = jest.fn();

describe('Component: CheckBox', () => {
  it('should render correctly if not checked and not disabled', () => {
    render(
      <CheckBox
        name={NAME}
        title={TITLE}
        isChecked={false}
        isDisabled={false}
        onCheckBoxChange={onFilterChange}
      />
    );

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByTestId(NAME)).toBeInTheDocument();
    expect(screen.queryByTestId(NAME)).not.toBeChecked();
    expect(screen.queryByTestId(NAME)).not.toBeDisabled();
  });

  it('should render correctly if checked and not disabled', () => {
    render(
      <CheckBox
        name={NAME}
        title={TITLE}
        isChecked
        isDisabled={false}
        onCheckBoxChange={onFilterChange}
      />
    );

    const checkBox = screen.getByTestId(NAME);

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toBeChecked();
    expect(screen.queryByTestId(NAME)).not.toBeDisabled();
  });

  it('should render correctly if not checked and disabled', () => {
    render(
      <CheckBox
        name={NAME}
        title={TITLE}
        isChecked={false}
        isDisabled
        onCheckBoxChange={onFilterChange}
      />
    );

    const checkBox = screen.getByTestId(NAME);

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
    expect(screen.queryByTestId(NAME)).not.toBeChecked();
    expect(checkBox).toBeDisabled();
  });

  it('should render correctly if checked and disabled', () => {
    render(
      <CheckBox
        name={NAME}
        title={TITLE}
        isChecked
        isDisabled
        onCheckBoxChange={onFilterChange}
      />
    );

    const checkBox = screen.getByTestId(NAME);

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toBeChecked();
    expect(checkBox).toBeDisabled();
  });

  it('should called callback when user clicked to checkbox', async () => {
    render(
      <CheckBox
        name={NAME}
        title={TITLE}
        isChecked={false}
        onCheckBoxChange={onFilterChange}
      />
    );

    const checkBox = screen.getByTestId(NAME);

    await userEvent.click(checkBox);

    expect(onFilterChange).toBeCalled();
  });
});
