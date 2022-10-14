import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeMockReviews } from '../../utils/mocks';
import ReviewsList from './reviews-list';

describe('Component: ReviewsList', () => {
  it('should render with show more button if reviews count more then part displayed reviews', () => {
    const PART_DISPLAYED_REVIEWS = 3;
    const reviews = makeMockReviews();

    render(
      <ReviewsList
        reviews={reviews}
        partDispalyedReviews={PART_DISPLAYED_REVIEWS}
      />
    );

    expect(screen.getAllByTestId('review-card')).toHaveLength(PART_DISPLAYED_REVIEWS);
    expect(screen.getByText(/Показать больше отзывов/i)).toBeInTheDocument();
  });

  it('should render without show more button if reviews count not more then part displayed reviews', () => {
    const PART_DISPLAYED_REVIEWS = 5;
    const reviews = makeMockReviews();

    render(
      <ReviewsList
        reviews={reviews}
        partDispalyedReviews={PART_DISPLAYED_REVIEWS}
      />
    );

    expect(screen.getAllByTestId('review-card')).toHaveLength(PART_DISPLAYED_REVIEWS);
    expect(screen.queryByText(/Показать больше отзывов/i)).not.toBeInTheDocument();
  });

  it('should render more reviews when user clicked on show more button', async () => {
    const PART_DISPLAYED_REVIEWS = 3;
    const reviews = makeMockReviews();

    render(
      <ReviewsList
        reviews={reviews}
        partDispalyedReviews={PART_DISPLAYED_REVIEWS}
      />
    );

    const showMoreButton = screen.getByText(/Показать больше отзывов/i);

    expect(screen.getAllByTestId('review-card')).toHaveLength(PART_DISPLAYED_REVIEWS);
    expect(showMoreButton).toBeInTheDocument();

    await userEvent.click(showMoreButton);

    expect(screen.getAllByTestId('review-card')).toHaveLength(reviews.length);
    expect(screen.queryByText(/Показать больше отзывов/i)).not.toBeInTheDocument();
  });
});
