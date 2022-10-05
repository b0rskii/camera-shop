const DATE_ATTRIBUTE_LENGTH = 10;

const ToReviewDate = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
});

export const formatDateToAttribute = (date: string) => date.slice(0, DATE_ATTRIBUTE_LENGTH);
export const formatDateToReview = (date: string) => ToReviewDate.format(Date.parse(date));
