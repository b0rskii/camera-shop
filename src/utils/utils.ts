const DATE_ATTRIBUTE_LENGTH = 10;

const ToReviewDate = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
});

export const formatDateToAttribute = (date: string) => date.slice(0, DATE_ATTRIBUTE_LENGTH);
export const formatDateToReview = (date: string) => ToReviewDate.format(Date.parse(date));

export const fixScrollbarOpen = () => {
  if (window.innerWidth !== document.documentElement.clientWidth) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  }
};

export const fixScrollbarClose = () => {
  if (document.documentElement.style.paddingRight !== '') {
    document.documentElement.style.paddingRight = '';
  }
};

export const debounce = (callback: ReturnType<typeof Function>, delay: number) => {
  let timout: NodeJS.Timeout;

  return (...args: unknown[]) => {
    clearTimeout(timout);

    timout = setTimeout(() => {
      callback(args);
    }, delay);
  };
};
