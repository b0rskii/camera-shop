import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render correctly with reviews count', () => {
    const MAX_RATING = 5;
    const RATING = 4;
    const REVIEW_COUNT = 20;

    render(
      <Rating
        maxRating={MAX_RATING}
        rating={RATING}
        reviewCount={REVIEW_COUNT}
      />
    );

    expect(screen.getAllByTestId('rating-icon')).toHaveLength(MAX_RATING);
    expect(screen.getByText(`Рейтинг: ${RATING}`)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
  });

  it('should render correctly without reviews count', () => {
    const MAX_RATING = 5;
    const RATING = 4;

    render(
      <Rating
        maxRating={MAX_RATING}
        rating={RATING}
      />
    );

    expect(screen.getAllByTestId('rating-icon')).toHaveLength(MAX_RATING);
    expect(screen.getByText(`Рейтинг: ${RATING}`)).toBeInTheDocument();
    expect(screen.queryByText(/Всего оценок:/i)).not.toBeInTheDocument();
  });
});
