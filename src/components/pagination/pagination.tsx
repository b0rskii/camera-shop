import { ReactNode, MouseEvent, memo } from 'react';

type PaginationProps = {
  productsTotalCount: number;
  productsPerPageCount: number;
  currentPage: number;
  onSetCurrentPage: (page: number) => void;
};

function Pagination(props: PaginationProps): JSX.Element | null {
  const {productsTotalCount, productsPerPageCount, currentPage, onSetCurrentPage} = props;
  const paginationList: ReactNode[] = [];

  const updateCatalog = (newPage: number) => {
    onSetCurrentPage(newPage);
    document.querySelector('.catalog')?.scrollIntoView();
  };

  const handlePrevButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(currentPage - 1);
  };

  const handleNextButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(currentPage + 1);
  };

  const handlePageNumberButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(Number(evt.currentTarget.textContent));
  };

  const pagesCount = Math.ceil(productsTotalCount / productsPerPageCount);

  if (pagesCount <= 1) {
    return null;
  }

  for (let i = 0; i < pagesCount; i++) {
    const pageNumber = String(i + 1);

    paginationList.push(
      <li className="pagination__item" key={pageNumber} data-testid="pagination-item">
        <a
          onClick={handlePageNumberButtonClick}
          className={`pagination__link ${Number(pageNumber) === currentPage ? 'pagination__link--active' : ''}`}
          href={pageNumber}
        >
          {pageNumber}
        </a>
      </li>
    );
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1 && productsTotalCount > 0 &&
        <li className="pagination__item">
          <a
            onClick={handlePrevButtonClick}
            className="pagination__link pagination__link--text"
            href="2"
          >
            Назад
          </a>
        </li>}

        {paginationList}

        {currentPage < paginationList.length &&
        <li className="pagination__item">
          <a
            onClick={handleNextButtonClick}
            className="pagination__link pagination__link--text"
            href="2"
          >
            Далее
          </a>
        </li>}
      </ul>
    </div>
  );
}

export default memo(Pagination);
