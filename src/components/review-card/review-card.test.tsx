import { render, screen } from '@testing-library/react';
import { makeMockReview } from '../../utils/mocks';
import ReviewCard from './review-card';

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const review = makeMockReview();
    const {userName, advantage, disadvantage, review: comment} = review;

    render(
      <ReviewCard review={review} />
    );

    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getByText(advantage)).toBeInTheDocument();
    expect(screen.getByText(disadvantage)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
  });
});
