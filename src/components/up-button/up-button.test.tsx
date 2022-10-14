import { render, screen } from '@testing-library/react';
import UpButton from './up-button';

describe('Component: UpButton', () => {

  it('should render correctly', () => {
    render(
      <UpButton />
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
