import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render loader with wrapper', () => {
    render(
      <Loader wrapper />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('loader-wrapper')).toBeInTheDocument();
  });

  it('should render loader without wrapper', () => {
    render(
      <Loader />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('loader-wrapper')).not.toBeInTheDocument();
  });
});
